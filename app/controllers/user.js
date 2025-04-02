const User = require('../database/models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve('../../.env')
})


const userController = {

    async index(req,res){
        try {
            const users = await User.findAll()
            if(!users){
                return res.status(404).json({ message:"no user found"})
            }
            return res.status(200).json({ users})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    },

    async create(req, res){
        const {email, password, firstName, lastName} = req.body

        try {
            
            const newUser = await User.create({email, password, firstName, lastName})
            return res.status(201).json({ user: newUser})

        } catch (error) {
            return res.status(500).json({ message: error})
        }
    },
    async login(req, res){
        const {email, password} = req.body
        console.log('Test', email, password)
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user){
                return res.status(400).json({ message: 'invalid data'})
            }
            console.log('Test')
            //on a bien le user avec le bon mail dans la BD
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if(!isPasswordValid){
                return res.status(400).json({ message: 'invalid data'})
            }

            // Si cela coïncide, on va créer le token 

            const token = jwt.sign(
                {email, role: user.role}, process.env.SECRET_KEY,
                {
                    expiresIn:'1h'
                }
            )

            return res.status(200).json({ token: token })

        } catch (error) {
            return res.status(500).json({message: error})
        }
    },
    getOneById(req, res){
        const {email, password, firstName, lastName} = req.body

        try {
            
        } catch (error) {
            return res.status(500).json({message: error})
        }
    },
    //http://localhost:3001/api/v1/user/(id)
    async deleteOneById(req, res){
        const {id} = req.params
        const { auth:{email, role} } = req 
        console.log('id', id)
        try {
            const userToDelete = await User.findOne({
                where:{
                    id: Number(id)
                }

            })

            if(!(role=="admin" || email== userToDelete.dataValues.email)){
                return res.status(401).json({ message: 'invalid token'})
            }
            console.log('userToDelete', userToDelete.dataValues)

            await userToDelete.destroy()
            return res.status(200).json({ message: `User with id: ${id} has been deleted`})
        } catch (error) {
            return res.status(500).json({message: error})
        }
    },
    updateOneByID(req, res){
        const {email, password, firstName, lastName} = req.body

        try {
            
        } catch (error) {
            return res.status(500).json({message: error})
        }
    },

}

module.exports = userController