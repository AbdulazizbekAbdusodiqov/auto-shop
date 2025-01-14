const errorHandler = (error, res) => {
    return res.status(400).send({ error: error.message });

}

module.exports = errorHandler