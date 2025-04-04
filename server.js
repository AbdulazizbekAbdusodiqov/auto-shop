import express from "express";
import config from "config";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";
import mainRouter from "./router/index.routes.js";
import Payment from "./model/Payment.js";
import errorHandlerMiddleware from "./middleware/errorHandling.middleware.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from '@adminjs/sequelize'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import Admin from "./model/Admin.js";
import bcrypt from "bcrypt"
import Customer from "./model/Customer.js";
import Car from "./model/Car.js";

const PORT = config.get("port")

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
})
const app = express()
const admin = new AdminJS({
    databases: [],
    rootPath: '/admin',
    resources: [Customer, Car],
})

const ConnectSession = Connect(session)
const sessionStore = new ConnectSession({
    conObject: {
        connectionString: config.get("db_url"),
        ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
})

const authenticate = async (email, password) => {
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
        return null
    }
    const validPassword = await bcrypt.compare(password, admin.hashed_password)
    if (!validPassword) {
        return null
    }
    return admin
}

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    },
    null,
    {
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        secret: 'sessionsecret',
        cookie: {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
        },
        name: 'adminjs',
    }
)

app.use(admin.options.rootPath, adminRouter)

app.use(express.json())
app.use(cookieParser())


app.use("/api", mainRouter)

app.use(errorHandlerMiddleware)


async function start() {
    try {
        Payment
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })

        app.listen(PORT, () => {
            console.log("Server running at http://localhost:" + PORT)
            console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
        })
    } catch (error) {
        console.log(error);
    }
};
start();