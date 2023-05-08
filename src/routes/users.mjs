import express from 'express';
import db from '../server/connection.mjs';
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/', async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(400);
});

router.get('/:users', async (req, res) => {
    let collection = await db.collection("users");
    let query = {_username: new ObjectId(req.params.username)};
    let result = await collection.findOne(query);

    if(!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
});

router.post('/', async (req, res) => {
    let newUser = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        salt: req.body.salt,
        two_factor: req.body.two_factor,
        save_login: req.body.save_login
    };
    let collection = await db.collection("users");
    let result = collection.insertOne(newUser);
    res.send(result).status(204);
});

router.patch('/:users', async (req, res) => {
    const query = {_username: new ObjectId(req.params.username)};
    const updates = {
        $set: {
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            salt: req.body.salt,
            two_factor: req.body.two_factor,
            save_login: req.body.save_login
        }
    };

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

router.delete('/:users', async (req, res) => {
   const query = {_username: new ObjectId(req.params.username)};

   const collection = await db.collection("users");
   let result = await collection.deleteOne(query);

   res.send(result).status(200);
});

export default router;