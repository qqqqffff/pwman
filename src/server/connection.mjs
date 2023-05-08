import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://p4blo:1Apollorow@pwman.deesszc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let connection;

try{
    connection = await client.connect();
}
catch (e) {
    console.log(e);
}

let db = connection.db("pman");

export default db;