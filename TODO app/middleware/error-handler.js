const {customAPIError} = require('../errors/custom-error');


const errorhandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof customAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg:'something went wrong'})
}

module.exports = errorhandlerMiddleWare