import express from 'express'
import mongoose from "mongoose"

import path from 'path'
import ejs from 'ejs'

import Photo from './models/Photo.js'

const __dirname = path.resolve();
mongoose.set('strictQuery', false)



const app = express()
app.set('view engine', 'ejs')
const port = 3000
mongoose.connect('mongodb://localhost/pcat-test-db')



app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const photos = await Photo.find({})
    res.render('index', {
        photos
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add', (req, res) => {
    res.render('add')
})
app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
})



app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})
