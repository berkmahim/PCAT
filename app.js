import express from 'express'
import path from 'path'
import ejs from 'ejs'
const __dirname = path.resolve();



const app = express()
app.set('view engine', 'ejs')
const port = 3000



app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add', (req, res) => {
    res.render('add')
})


app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})
