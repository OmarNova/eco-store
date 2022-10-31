const MongoClient = require('mongodb').MongoClient;

const data = require('./data.json');

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if(err) throw err;
    var db = client.db('ecostore');
    console.log("creado");

    db.createCollection("products", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");

        data.forEach(e=>{
            db.collection('products').insertOne(e);
        });

        console.log("Data lista");

        

    });

   

});






