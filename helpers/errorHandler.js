const errorHandler = (error, res) => {
    console.log(error);
    
    return res.status(400).send({ error: error.message });

}

module.exports = errorHandler