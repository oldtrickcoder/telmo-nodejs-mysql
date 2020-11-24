
const mysql=require('mysql');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"telmo_nodejs"});
// Bagian LOGIN
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email || !password){
            return res.status(400).render('login',{message:'please provide email and password'});
        }

        db.query('SELECT * FROM users WHERE email = ?',[email], async (error,results)=>{
            console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].password)))
            {res.status(401).render('login',{message:'Email or Password is incorrect'});}
            else{
                const id = results[0].id;
                const token=jwt.sign({ id: id},'mysupersecretpassword', {expiresIn: '90d'});
                console.log("the token is :  " + token);
                const cookieOptions = { expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000 ),httpOnly:true}
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
 
        
        })


    }

    catch(error){
        console.log(error);
    }
}










// bagian register    
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

function newFunction(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresin: process.env.JWT_EXPIRES_IN });
}

