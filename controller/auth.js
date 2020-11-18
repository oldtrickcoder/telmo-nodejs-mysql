
const mysql=require('mysql');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"telmo_nodejs"});

exports.login=function(req,res){
    try{
        const {email,password}=req.body;
        if (!email||!password)
        {return res.status(400).render('login',{message:'Please provide an email and password'});}
        
        db.query('SELECT * FROM users WHERE email = ?',[email], async (error,results)=>{
            if(!email|| !(await bcrypt.compare(password, results[0].password)) )
            {res.status(401).render('login',{message:'Email or Password is Incorect'});}
            
        });

        
    } catch (error) {
        console.log(error);
        res.status(401).render('login',{message:'Terjadi kesalahan di Internal Sistem'});
    }
   

}
    

//    
exports.register=(req,res)=>{
    const {name,email,password,passwordconfirm}=req.body;
    console.log(req.body);
    db.query('SELECT email FROM users WHERE email = ?',[email], async (error,results)=>{
        if(error){console.log(error);}
        if(results.length > 0){return res.render('register', {message: 'That email already in use'});}
        else if ( password !== passwordconfirm){return res.render('register', {message: 'Passwords do not match'});}
        let  hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashedPassword }, (error,results) => {
            if(error){console.log(error);}
            else{console.log(results);
            return res.render('register',{ message: 'User Registered'});}
        })    
    });

   
  
}

