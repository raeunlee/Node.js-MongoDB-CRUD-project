console.log('crud 연습중입니다')

const express = require('express');
const app = express();
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})


MongoClient.connect("mongodb+srv://user:fkdmsfkdms19@cluster0.3bwgfru.mongodb.net/?retryWrites=true&w=majority",{
	useUnifiedTopology: true},
	 (err, client) => {
	const db = client.db('mymy-quotes')
	const quotesCollection = db.collection('quotes')
	
	if (err) return console.error(err)
  	console.log('Connected to Database')
})
