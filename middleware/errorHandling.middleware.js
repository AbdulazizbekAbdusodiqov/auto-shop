
export default function (err, req, res, next) {


    if (err instanceof SyntaxError) {
        return res.status(err.status).send({ message: err.message })
    }
    console.log(err);
    
    return res.status(500).send({ message: "nazarda tutilmagan xatolik" })
}
