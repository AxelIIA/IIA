const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve('../../.env')
})

class AuthService {
    static getToken(req, res, next){
        // il va recup le token dans la requete
        const { authorization } = req.headers
        if(!authorization){
            return res.status(400).json({ message: 'Unauthoized'})
        }
        // Authorization : Bearer 
        const token = authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({ message: 'Unauthoized'})
        }
        // le token existe :
        req.token = token
        next()
    }
    static decypherToken(req, res, next){
        // il va dechiffrer le token
        const { token } = req
        if(!token){
            return res.status(400).json({ message: 'Unauthoized'})
        }
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            req.auth = decodedToken
            next()

        } catch (error) {
            return res.status(403).json({ message: 'invalid token'})
        }


    }
}


module.exports = AuthService