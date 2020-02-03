const jwt = require('jsonwebtoken');

//Token verification
let tokenVerify = (req, res, next) => {
    let token = req.get('Token');
    
    //is token valid
    jwt.verify(token, process.env.TOKEN_SIGN, (err, decoded) => {
        
        if (err) {
            return res.status(401).json({
                ok: false, 
                err
            })
        }

        //set jedi from decoded token info
        req.jedi = decoded.jedi;
        next();
    })

   
}


let hasAdminRole = (req, res, next) => {

    let jedi = req.jedi;

    if (jedi.role === 'ADMIN_ROLE') {

        next();

    } else {

        return res.status(403).json({
            ok: false,
            message: 'You are not authorized to do this operation'
        })

    }


}

module.exports = {
    tokenVerify,
    hasAdminRole
}