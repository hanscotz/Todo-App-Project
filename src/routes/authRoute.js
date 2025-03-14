import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { json } from 'stream/consumers'
import prisma from '../prismaClient.js';  // ✅ Correct


const router= express.Router()
//register new user endpoint /auth/register
router.post('/register', async(req,res)=>{
    const {username,password} = req.body
    //save hans@gmail.com hansco123


//encrypt password
const hashedPassword= bcrypt.hashSync(password,8)

try {
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    })
    // create a todo 
    const defaultTodo= `Hellow :) Add Your First TODO!`
    await prisma.todo.create({ 
       data:{
        task: defaultTodo,
        userId: user.id
       } 
    })
    
    //create token 
    const token= jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn: '24h' })
    res.json({token})
} 
catch (error) {
    console.log(error.message)
    res.sendStatus(503)
    
}




    

})
router.post('/login',async (req,res)=>{
    //get the email and look the password associated with the email int he database
    const {username,password}= req.body
    try {
        //get username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        //check if username exist
        if(!user){
            return res.status(404).send({message:"User not Found"})
        }
        //compare password
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        //if password is not v alid
        if (!passwordIsValid){
            return res.status(404).send({message:"Incorrect Password"})
            console.log("incerrect password")
            
        }
        if(passwordIsValid){
        console.log(user)
        //then the autheticated user  
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
        
    }
})
export default router