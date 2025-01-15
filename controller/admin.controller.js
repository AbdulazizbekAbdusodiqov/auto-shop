const errorHandler = require("../helpers/errorHandler");
const Admin = require("../model/Admin");
const Contract = require("../model/Contract");
const bcrypt = require("bcrypt");
const {adminValidation} = require("../validations/admin.validation");
const { AdminJwt } = require("../service/jwt.service");

const createAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        
        const oldAdmin = await Admin.findOne({ where: { email } });
        if (oldAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const {error, value} = adminValidation(req.body);

        if(error){
            return errorHandler(error, res);
        }
        
        const hashed_password = await bcrypt.hash(value.password, 7);

        
        
        const admin = Admin.build({ ...value, hashed_password });
        const payload = {
            id: admin.id,
            email: value.email,
            role: "admin"
        }
        const tokens = AdminJwt.generateTokens(payload)
        admin.hashed_refresh_token = tokens.refreshToken;
        
        await admin.save();
        return res.status(201).send(admin);

    } catch (error) {
        errorHandler(error, res);
    }
}

const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({include :Contract});

        if (admins?.dataValues?.length === 0) {
            return res.status(404).send({ message: "admin is not available" });
        }

        return res.status(200).send(admins);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getAdminById = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id, {include: Contract});
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).send(admin.dataValues);

    } catch (error) {
        errorHandler(error, res);
    }
}

const updateAdmin = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id,{include :Contract});
        
        if (!admin?.dataValues) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const { error, value } = adminValidation(req.body);
        if(error){
            return errorHandler(error, res);
        }
        

        const hashed_password = bcrypt.hashSync(value.password, 7);

        await admin.update({ ...value, hashed_password });

        return res.status(200).send(admin.dataValues);

    } catch (error) {
        errorHandler(error, res);
    }
}

const deleteAdmin = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id);
 
        if (!admin?.dataValues) {
            return res.status(404).json({ message: "Admin not found" });
        }

        await admin.destroy();

        return res.status(200).send({message : "Admin deleted"});

    } catch (error) {
        errorHandler(error, res);
    }
}

module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}