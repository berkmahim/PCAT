import Photo from '../models/Photo.js'
import fs from "fs";
import path from 'path'
import photo from "../models/Photo.js";
const __dirname = path.resolve();


const photoControllers = {}

photoControllers.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    console.log(path.resolve())
    res.render('index', {
        photos
    })
}
photoControllers.getPhoto = async (req, res) => {
    console.log(req.params.id)
    // res.render('photo')
    const photo = await Photo.findById(req.params.id)
    res.render('photo', {
        photo
    })
}

photoControllers.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    photo.title = req.body.title
    photo.description = req.body.description
    await photo.save()
    res.redirect(`/photos/${req.params.id}`)
}

photoControllers.deletePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    const deletedPhoto = __dirname + '/public' + photo.image
    fs.unlinkSync(deletedPhoto)
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect("/")
}

photoControllers.createPhoto = async (req, res) => {
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
}





export default photoControllers