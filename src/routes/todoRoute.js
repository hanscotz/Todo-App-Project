 import express from 'express'

 import prisma from '../prismaClient.js'

 const router= express.Router()
//to get all todos for logged in user
 router.get('/',  async(req,res)=>{
    const todos = await prisma.todo.findMany({
      where:{
        userId: req.userId
      }
    })
    res.json(todos)

 })
// to create a new todo
 router.post('/',async (req,res)=>{
   const {task} = req.body

   const todo = await prisma.todo.create({
    data:{
      userId: req.userId,
      task
    }
   })
   
   res.json(todo)




 })
// to update todo
 router.put('/:id',async (req,res)=>{
   const {completed}= req.body
   const {id} = req.params
   
   const updatedTodo = await prisma.todo.update({
    where:{
      id:parseInt(id),
      userId:req.userId
    }, 
    data:{
      completed: !!completed

    }
   })

   res.json(updatedTodo)

 })
//to delete todo
router.delete('/:id',async(req,res)=>{
   const {id} = req.params
   const userId = req.userId

   await prisma.todo.delete({
    where:{
      id:parseInt(id),
      userId

    }

   })
   
   
   res.send({message:"Todo Deleted"})

})

export default router