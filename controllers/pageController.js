import Photo from "../models/Photo.js";

const pageController = {}

pageController.getAboutPage = (req, res) => {
    res.render('about')
}

pageController.getAdd  = (req, res) => {
    res.render('add')
}

pageController.getEdit =  async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('edit', {
        photo
    })
}

export default pageController