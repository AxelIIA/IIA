require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json({
    limit: '10mb'
}))

// Quand il reçoit une requête visant cet endpoint
// https://iia-front.onrender.com//api/data
app.post('/api/data', (req, res) => {
    // const { ip } = req
    const { email, password } = req.body
    console.log(email, password)
    res.status(200)
})

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running at ${process.env.PORT}`)
})

