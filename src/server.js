require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(routes)

app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        error: 'Internal server error!'
    })
})

app.listen(PORT, () => console.log('server running...'))
