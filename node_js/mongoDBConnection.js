const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://xxxxxxxxxxxx:xxxxxxxx@clusterx.xxxxxxxx.xxxxxxx.xxx/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

client.connect().catch((error) => { console.log(error) })

module.exports.client = client
