var express=require('express')
var app=express()

//database connection 
var mongojs=require('mongojs')
var db=mongojs('mongodb://sh48:sh026048@ds241895.mlab.com:41895/transport',['testData'])


//app.get('/',(req,res)=>res.send('hello'));//getting from browser just type http://localhost:3000/

app.get('/', function (req,res) {
    db.testData.find(function(err,docs){   ///db.database collection name 
   //var data = JSON.parse(docs);
   res.send(docs)
    })
 })

 //app.get('/a',(req,res)=>(db.testData.find()=res.send(docs))));
 


//get for temp data
app.get('/temp',(req,res)=>res.send('temparature data here'));
//get for light data
app.get('/light',(req,res)=>res.send('light data here'));
//geting humidity data
app.get('/humidity',(req,res)=>res.send('humidity data here'));

console.log('listening')
app.listen(3000)