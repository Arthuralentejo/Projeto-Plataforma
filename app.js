const express = require('express')

const contactDal = require('./DAL/contacts')
const documentDal = require('./DAL/documents')
const studentDal = require('./DAL/students')
const app = express()


app.get('/contact', async(req, res) => {
    let ret = await contactDal.load(1)
    res.send(ret)
})

app.get('/document', async(req, res) => {
    let ret = await documentDal.load(1)
    res.send(ret)
})

app.get('/', async(req, res) => {
    let ret = await studentDal.load(1)
    res.send(ret)
})


app.get('/create-contact', async(req, res) => {
    let ret = await contactDal.create(1, 3, 'instagram', 'alexsilva7')
    res.send(ret)
})

/*
app.get('/create-document', async(req, res) => {
    let ret = await documentDal.create()
    res.send(ret)
})
*/


app.listen(3000, () => {
    console.log('Escutando na porta 3000')
    console.log('Pressione CRTL+C para encerrar o servidor')
})