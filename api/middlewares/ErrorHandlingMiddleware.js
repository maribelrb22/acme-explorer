'use strict'

const sendErrors = async (req, res, next) => {
    let err = req.err;
    if (err.name === 'ValidationError' || err.name === 'MongoServerError' && err.code === 11000) {
        res.status(400).json(err);
    } else if (err.name === 'StagesError') {
        res.status(400).json({ message: err.message });
    } else {
        console.log(err)
        res.status(500).json(err);
    }
}

export default sendErrors