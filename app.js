import express from 'express'
import mongoose from "mongoose"
import fileUpload from "express-fileupload"
import methodOverride from "method-override"

import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

import Photo from './models/Photo.js'

const __dirname = path.resolve();
mongoose.set('strictQuery', false)



const app = express()
app.set('view engine', 'ejs')
const port = 3000
mongoose.connect('mongodb://localhost/pcat-test-db')


//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//////////////

app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos
    })
})

app.get('/photos/:id', async (req, res) => {
    console.log(req.params.id)
    // res.render('photo')
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('edit', {
        photo
    })
})



app.post('/photos', async (req, res) => {
    //console.log(req.files.image)
    // await Photo.create(req.body)
    // res.redirect('/')
    const uploadDir = 'public/uploads'
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadedImage = req.files.image
    let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        })
        res.redirect('/')
    })
})

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    photo.title = req.body.title
    photo.description = req.body.description
    await photo.save()
    res.redirect(`/photos/${req.params.id}`)
})

app.delete('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    const deletedPhoto = __dirname + '/public' + photo.image
    fs.unlinkSync(deletedPhoto)
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect("/")
})





app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})
