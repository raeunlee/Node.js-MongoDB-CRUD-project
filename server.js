const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser= require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://user:<password>@cluster0.3bwgfru.mongodb.net/?retryWrites=true&w=majority'

//app.use('/api', createProxyMiddleware({ target: 'http://www.example.org:9000', changeOrigin: true }));
app.listen(3000, function() {
  console.log('listening on 3000')
})


MongoClient.connect(url, {
  useUnifiedTopology: true
} , function(err, database) {
  if(err) return console.error(err)
  console.log("Connected to Database")
  const db = database.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')

  //차례로 use, get, post, listen 작성해주기 앞전에 작성한 것을 조금수정해서 붙인것임
  app.set('view engine', 'ejs')

	app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('public'))

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/') // 아직 quotes 페이지가 없으므로 /로 redirect
        console.log(result)
      })
      .catch(error => console.error(error))
  })


  app.get('/', (req, res) => {
    const cursor = db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results })
    })
    .catch(error => console.error(error))
  })
  
  app.use(bodyParser.json())

  //PUT method로 put request 처리
  app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(
    { name: 'hihi' },
    {
      $set: {
        name: req.body.name, //아까 main.js에서 PUT한 name, quote
        quote: req.body.quote
      }
    },
    {
            // 찾는 쿼리가 없을경우 set값을 quotes에 추가한다
            upsert: true
     }
  )
    .then(result => {console.log(result)})
    .catch(error => console.error(error))
})

});

