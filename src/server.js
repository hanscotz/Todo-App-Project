import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoute.js'
import todoRoutes from './routes/todoRoute.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const port = process.env.port || 5000

//get the file path from  url of the current module
const __filename = fileURLToPath(import.meta.url)
// get the directory name from the file path
const __dirname = dirname(__filename)

// serves the html file from public dir
// tells express to serve all file from public dir

app.use(express.static(path.join(__dirname, '../public')))
//middleware
app.use(express.json())


// serving html file from public directiry
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', authRoutes)
app.use('/todos',authMiddleware, todoRoutes)
 
app.listen(port, () => {


    console.log(`server has started on port:${port}`)
}) 