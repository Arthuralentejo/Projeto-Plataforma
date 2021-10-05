const express = require('express')

const contactDal = require('./DAL/contacts')
const documentDal = require('./DAL/documents')
const studentDal = require('./DAL/students')
const app = express()

const dbconnection = require('./DAL/dbConnection')

//configurando a ejs
app.set('view engine','ejs')

//definindo o caminho da views wjs
app.set('views', './app/views')

//config de arquivos estáticos
app.use(express.static('./app'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async(req, res) => {
    res.render("home/index")
})

app.post('/admin', async(req, res) => {
    let {login, senha} = req.body
    let pass = await dbconnection.query('SELECT pass FROM admins WHERE login = $1', [login])
    let password

    if(pass.rows.length == 0){
        password = ''
    }
    else{
        password = pass.rows[0].pass
    }
    
    if(senha == password){
        res.redirect('/admin')
    }else{
        res.redirect('/')
    }
})

app.get('/contact', async(req, res) => {
    let ret = await contactDal.load(1)
    res.send(ret)
})

app.get('/document', async(req, res) => {
    let ret = await documentDal.load(1)
    res.send(ret)
})

/*
app.get('/', async(req, res) => {
    let ret = await studentDal.load(1)
    res.send(ret)
})
*/

app.get('/create-contact', async(req, res) => {
    let ret = await contactDal.create(1, 3, 'instagram', 'alexsilva7')
    res.send(ret)
})

app.listen(3000, () => {
    console.log('Escutando na porta 3000')
    console.log('Pressione CRTL+C para encerrar o servidor')
})