const path = require('path')
const https = require('https')
const express = require('express')
const hbs = require('hbs')
const app = express()
const PORT = process.env.PORT || 3000
const publicDir = path.join(__dirname,'../public')
const partialsDir = path.join(__dirname,'../template/partials')
const viewsDir = path.join(__dirname,'../template/views')
app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)
hbs.handlebars.registerHelper('isZero', function (value) {
    return value >= 0;
  });  
app.get('/:id?',(req,res)=>{
    let page = parseInt(req.params.id) || 0;
    const url = `https://backtest.achilleseg.com/api/ProductsUpdated?lang_id=1&page=${page}&limit=12`;
    console.log(url,page)
    const request = https.request(url,resp=>{
    let data=``;
    resp.on('data',chunk=>{
        data += chunk.toString()
    })
    resp.on('end',()=>{
    res.render('home',{
        data:JSON.parse(data).result,
        page,
        prev:page-1,
        next:page+1
    })
    })
})
    request.end()
})
app.listen(PORT,()=>{
    console.log(`running at PORT : ${PORT}`)
})