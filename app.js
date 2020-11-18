const master = require('console')
const express   = require('express');
var app =  express();
const mysql=require('mysql');
const path=require('path')
const dotenv=require('dotenv');
const hbs=require('hbs');
const jalur=require('./routes/pages');
const cookie =require('cookie-parser');


const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"telmo_nodejs"});


db.connect((err) => {
    if (err){console.log(err)}
    else{console.log("Koneksi MySQL berhasil")}
    });
////////////////////////////
const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
//parse url encoded body (as sent by HTML Forms)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookie());
//files view 
app.set('view engine','hbs');

//define routes
app.use('/', jalur);
//
app.use('/auth',require('./routes/auth'));

app.listen(3000,(req,res) => {
        console.log("server starting I love You 3000");
    });



