import { v4 } from "uuid";
import config from "config";
import { hash, hashSync, compareSync } from "bcrypt";
import errorHandler from "../helpers/errorHandler.js";
import Admin from "../model/Admin.js";
import Contract from "../model/Contract.js";
import { adminValidation } from "../validations/admin.validation.js";
import { AdminJwt } from "../service/jwt.service.js";
import mailService from "../service/mail.service.js";

export const createAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        const oldAdmin = await Admin.findOne({ where: { email } });
        
        if (oldAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const { error, value } = adminValidation(req.body);

        if (error) {
            return errorHandler(error, res);
        }

        const hashed_password = await hash(value.password, 7);

        const activation_link = v4()

        const admin = await Admin.create({ ...value, hashed_password, activation_link });
        const payload = {
            id: admin.id,
            email: value.email,
            is_creator: admin.is_creator,
            role: "admin"
        }
        const tokens = AdminJwt.generateTokens(payload)

        await admin.update({ hashed_refresh_token: tokens.refreshToken });

        await mailService.sendMailActivationCode(admin.email,
            `${config.get("api_url")}${config.get("port")}/api/admin/activate/${activation_link}`
        );

        return res.status(201).send({ admin, accessToken: tokens.accessToken });    

    } catch (error) {
        errorHandler(error, res);
    }
}

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({ include: Contract });

        if (admins?.dataValues?.length === 0) {
            return res.status(404).send({ message: "admin is not available" });
        }

        return res.status(200).send(admins);
    } catch (error) {
        errorHandler(error, res);
    }
}

export const getAdminById = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id, { include: Contract });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).send(admin.dataValues);

    } catch (error) {
        errorHandler(error, res);
    }
}

export const updateAdmin = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id, { include: Contract });

        if (!admin?.dataValues) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const { error, value } = adminValidation(req.body);
        if (error) {
            return errorHandler(error, res);
        }


        const hashed_password = hashSync(value.password, 7);

        await admin.update({ ...value, hashed_password });

        return res.status(200).send(admin.dataValues);

    } catch (error) {
        errorHandler(error, res);
    }
}

export const deleteAdmin = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id);

        if (!admin?.dataValues) {
            return res.status(404).json({ message: "Admin not found" });
        }

        await admin.destroy();

        return res.status(200).send({ message: "Admin deleted" });

    } catch (error) {
        errorHandler(error, res);
    }
}

export const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        const admin = await Admin.findOne({ where: { email } })
        if (!admin?.dataValues) {
            return res.status(401).send({ message: "Invalid email or password" })
        }
        const validPassword = compareSync(password, admin.hashed_password)
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" })
        }

        const payload = {
            id: admin.id,
            email: admin.email,
            is_creator: admin.is_creator,
            role: "admin"
        }
        const tokens = AdminJwt.generateTokens(payload)

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })
        await admin.update({ hashed_refresh_token: tokens.refreshToken })


        return res.status(200).send({
            message: "welcome to auto-shop",
            refresh_token: admin.hashed_refresh_token,
            access_token: tokens.accessToken
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

export const logoutAdmin = async (req, res) => {
    try {

        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(404).send({ message: "Not found token" })
        }
        console.log(refreshToken);

        const admin = await Admin.findOne({ where: { hashed_refresh_token: refreshToken } });
        console.log(admin);

        if (!admin) {
            return res.status(404).send({ message: "admin didn't exists" })
        }

        res.clearCookie("refreshToken");

        await admin.update({ hashed_refresh_token: "" })

        return res.status(200).send({ message: "succes", refreshToken: admin.hashed_refresh_token });

    } catch (error) {
        errorHandler(error, res);
    }
};

export const refreshAdminToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(404).send({ message: "AdminToken not found token" })
        }

        try {
            const tokenFromCookie = await AdminJwt.verifyRefreshToken(refreshToken)

        } catch (error) {
            return errorHandler(error, res)
        }

        const admin = await Admin.findOne({ refresh_token: refreshToken })

        if (!admin) {
            return res.status(404).send({ message: "Admin not found" })
        }

        const payload = {
            id: admin._id,
            email: admin.email,
            role: "admin",
            is_creator: admin.is_creator,
        };

        const tokens = AdminJwt.generateTokens(payload);
        console.log(tokens);

        await admin.update({ hashed_refresh_token: tokens.refreshToken })

        res.cookie("refreshToken", tokens.refreshToken, {
            hhtpOnly: true,
            maxAge: config.get("refresh_token_ms")
        });

        res.status(200).send({
            message: "welcome to auto-shop",
            refreshToken: admin.hashed_refresh_token,
            access_token: tokens.accessToken
        });

    } catch (error) {
        errorHandler(error, res)
    }
};

export const activateAdmin = async (req, res) => {
    try {
        const link = req.params.link;

        const admin = await Admin.findOne({ where: { activation_link: link } });

        if (!admin?.dataValues) {
            return res.status(400).send({ message: "No such admin found" })
        }
        if (admin.is_active) {
            return res.status(400).send({ message: "admin has already activated" })
        }

        await admin.update({ is_active: true })

        res.send({
            message: "Admin activated",
            is_active: admin.is_active
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

