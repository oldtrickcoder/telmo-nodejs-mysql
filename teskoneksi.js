const mysql=require('mysql');
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"telmo_nodejs"});

     
        var sql = "INSERT INTO users (name, email, password) VALUES ('Jajang_Nurohman', 'Jajang_Nurohman@hotmail.com', 'asdasdasd')";
        db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Data Berhasil dimasukan");
  });
     

