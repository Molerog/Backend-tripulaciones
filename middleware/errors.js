const { send } = require("express/lib/response");

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message); 
    if(errors.length > 1) {
        let chain = "";
        for (let i = 0; i < errors.length; i++) {
          chain += errors[i] + " || "
        };
        const string = chain.slice(0, -4);
        res.status(400).send({messages: string})
    } else {
        res.status(400).send({messages: errors})
    }
};

const typeError = (err, req, res, next) => {   
    const errOrigin = err.origin;
    if(err.name === 'ValidationError') return err = handleValidationError(err, res);
    else if (err.code === 11000){
        res.status(400).send(
            {message: 'Este email ya ha sido registrado.'}
        )
    } else if (errOrigin === 'User'){
        res.status(500).send('Ha habido un problema al crear el usuario.')
    } else if (errOrigin === 'Comment'){
        res.status(500).send('Ha habido un problema al crear el comentario.')
    } else if (errOrigin === 'Route') {
        res.status(500).send('Ha habido un problema al crear la ruta.')
    } else {
        res.status(500).send('Ha habido un error de sintaxis.')
    }  
};

module.exports = { typeError }