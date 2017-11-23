var express=require('express')
var app=express()
var bodyParser = require('body-parser')
var mqtt=require('mqtt')

var client  = mqtt.connect('mqtt://iot.eclipse.org')



app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

 //app.get('/a',(res,req)=>((err,docs)=>res.send(docs)))
 


//get for temp data
app.get('/temp',(req,res)=>res.send('temparature data here'));
//get for light data
app.get('/light',(req,res)=>res.send('light data here'));
//geting humidity data
app.get('/humidity',(req,res)=>res.send('humidity data here'));

//posting data into database
app.post('/post',function(req,res) {
    db.testData.save(req.body);
    console.log('post here');
    res.json(req.body);
    
});

//mqtt server to mqtt lence code

client.on('connect', function () {
    client.subscribe('ssdg12')
    client.publish('ssdg12', 'Hello mqtt')
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    var mes=message.toString();
    var j={"message":mes};
    db.testData.save(j)
    console.log(mes);
    console.log(j);
  })
  





console.log('listening')
app.listen(3000)