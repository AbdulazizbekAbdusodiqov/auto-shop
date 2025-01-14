const errorHandler = require("../helpers/errorHandler");
const Admin = require("../model/Admin");
const Contract = require("../model/Contract");

const createAdmin = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password } = req.body;
        const oldAdmin = await Admin.findOne({ where: { email } });
        if (oldAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashed_password = await bcrypt.hash(password, 8);
        const admin = await Admin.create({ first_name, last_name, phone_number, email, hashed_password });

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

        const { first_name, last_name, phone_number, email } = req.body;
        const admin = await Admin.findByPk(req.params.id,{include :Contract});
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await admin.update({ first_name, last_name, phone_number, email });
        return res.status(200).send(admin.dataValues);

    } catch (error) {
        errorHandler(error, res);
    }
}

const deleteAdmin = async (req, res) => {
    try {

        const admin = await Admin.findByPk(req.params.id);
 
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await admin.destroy();

        return res.status(204).send({message : "Admin deleted"});

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