import express from 'express'
import path from 'path'
const __dirname = path.resolve();



const app = express()
const port = 3000



app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'temp/index.html'))
})


app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})