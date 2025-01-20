const express = require("express")
const config = require("config")
const cookieParser = require("cookie-parser")
const sequelize = require("./config/db")
const mainRouter = require("./router/index.routes")
const Payment = require("./model/Payment")
const errorHandlerMiddleware = require("./middleware/errorHandling.middleware")


const PORT = config.get("port")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.engine("ejs", ejs.__express);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("views"));



app.use("/api", mainRouter)


app.use(errorHandlerMiddleware) 


async function start() {
    try {
        Payment
        await sequelize.authenticate()
        await sequelize.sync({alter:true})

        app.listen(PORT,()=>{
            console.log("Server running at http://localhost:"+PORT)
        })      
    } catch (error) {
        console.log(error);
    }
};
start();