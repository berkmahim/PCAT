// import mongoose from "mongoose"
// mongoose.set('strictQuery', false)


// const Schema = mongoose.Schema

// //connect db
// mongoose.connect('mongodb://localhost/pcat-test-db')

// //create schema

// const PhotoSchema = new Schema({
//     title: String,
//     description: String
// })

// const Photo = mongoose.model('Photo', PhotoSchema)

// //insert a data
// // Photo.create({
// //     title: 'photo title2',
// //     description: 'lorem ipsum dolor2'
// // })

// //read data
// Photo.find({}, (err, data) => {
//     console.log(data)
// })

// //update data
// const id = '63d552a1f548e6055af73808'
// Photo.findByIdAndUpdate(
//     id, {
//     title: 'title updated',
//     description: 'desc updated'
// },
//     (err, data) => {
//         console.log(data)
//     }
// )


// //delete data

// Photo.findByIdAndDelete(id, (err, data) => {
//     console.log('veri silindi')
// })

