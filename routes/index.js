var express = require('express');
var path = require('path');
var mysql= require('mysql');

var con=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "oniline_boutique"

});

con.connect(function(err){
if (err) throw err;
console.log('database connected successfully');
});

const router = express.Router();

router.use(express.static(__dirname+"./public/"));


router.get('/',function(req, res, next) {
 var getQuery="select * from `users`";
 con.query(getQuery,function(err,result){

    if(err) throw err;

    res.render('index', { title: 'Employee Records', records:result,success:'' });
 
 });

});


router.post('/', function(req, res, next) {
    console.log(req.body);
    var f_name= req.body.fname;
    var l_name= req.body.lname;
    var username= req.body.username;
    var password= req.body.password;
  //  var totalHour= req.body.ttlhr;
  //  var total= parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr);

  con.query('SELECT username FROM users WHERE username = ?',username, (error,results)=>{
        if(error){
      console.log(error);
    }
    if(results.length > 0){
      return res.render('index',{
        message: "That username is already in use"
      })
    }
  });  
  // this shoukd be the exact column name
  var insertQuery='insert into `users`(`f_name`,`l_name`,`username`,`password`) VALUES (?,?,?,?)';
  var query=mysql.format(insertQuery,[f_name,l_name,username,password]);
  // this shoukd be the exact variable name we defined above
      con.query(query,function(err,response){
      if (err) throw err;
      else res.render('index', {success:'Record Inserted Successfully'});
 
  });
});
//});

 router.get('/edit/:id', function(req, res, next) {
var id=req.params.id;

var getQuery="select * from `users` where `id`=?";
var query=mysql.format(getQuery,id);
     con.query(query,function(err,result){
     if(err) throw err;
     var string=JSON.stringify(result);
     var json =  JSON.parse(string);
       
res.render('edit', { title: 'Employee Records', records:json,success:'' });
 
});
});

// router.post('/update/', function(req, res, next) {
//     var id= req.body.id;
//     var f_name= req.body.fname;
//     var l_name= req.body.lname;
//     var username = req.body.username;
//     var password = req.body.password;
  //  var totalHour= req.body.ttlhr;
  //  var total= parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr);
 
//    var updateQuery='UPDATE `users` SET `f_name`=? ,`l_name`=?,`username`=?,`password`=?';
//     var query=mysql.format(updateQuery,[f_name,l_name,username,password,id]);
//   con.query(query,function(err,response){
//       if(err) throw err;
//      // console.log(response.insertId);
//   res.redirect('/');
// });
// });

// router.get('/delete/:id', function(req, res, next) {
//     var id=req.params.id;

//     var deleteQuery="delete from `users` where `id`=?";
//     var query=mysql.format(deleteQuery,id);
//      con.query(query,function(err){

//          if(err) throw err;
//  res.redirect('/');
//     });
    
// }); 

module.exports = router;