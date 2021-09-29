const express = require('express')
const contactDal = require('./DAL/contact')
const app = express()


app.get('/', async(req, res) => {
    let ret = await contactDal.load("chave")
    res.send(ret)
})

app.listen(3000, () => {
    console.log('Escutando na porta 3000')
    console.log('Pressione CRTL+C para encerrar o servidor')
})