import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('helreo wsorldort')
})


app.listen(3000, () => {
    console.log(`sunucu ${port} portunda başlatıldı`)
})