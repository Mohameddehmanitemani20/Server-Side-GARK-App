const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const participantId = decodedToken.participantId;
        req.auth = { participantId };
        if(req.body.participantId && req.body.participantId !== participantId){
            throw 'Invalid participant ID'
        }else {
            next();
        }
    }catch (error){
        res.status(401).json({error:error | "can't authentify request"})
    }
};