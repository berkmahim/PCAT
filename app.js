import express from 'express'
import mongoose from "mongoose"
import fileUpload from "express-fileupload"
import methodOverride from "method-override"

import ejs from 'ejs'
// import fs from 'fs'
//
// import Photo from './models/Photo.js'
import photoControllers from './controllers/photoControllers.js'
import pageController from './controllers/pageController.js'

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


//CRUD OPS
app.get('/', photoControllers.getAllPhotos)
app.get('/photos/:id', photoControllers.getPhoto)
app.put('/photos/:id', photoControllers.updatePhoto)
app.delete('/photos/:id', photoControllers.deletePhoto)
// Page Render
app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAdd)
app.get('/photos/edit/:id',pageController.getEdit)

app.post('/photos', photoControllers.createPhoto)







app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})
