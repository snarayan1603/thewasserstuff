const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://snarayan1603:Bablu123@cluster0.c9iqpz4.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

client.connect().catch((error) => { console.log(error) })

module.exports.client = client
