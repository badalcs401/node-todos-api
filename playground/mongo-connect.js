
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if(err){
        return console.log('unable to connect to mongoDB');
    }
    console.log('connected to mongo DB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) =>{
    //     if(err){
    //         return console.log('unable to connect to insert');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Users').insertOne({
        name: 'Sharma',
        age: 24,
        location: 'bangalore'
    }, (err, result) =>{
        if(err){
            return console.log('unable to connect to insert');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    client.close();
});