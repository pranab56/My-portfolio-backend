const express = require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port =process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('database is connect')
  })



  

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.waykm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
    const webCollection = client.db("portfolio").collection("website");

    app.get('/website',async(req,res)=>{
        const query={};
        const result=await webCollection.find(query).toArray();
        res.send(result)
    })
    app.get('/website/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id: ObjectId(id)};
        const result=await webCollection.findOne(query);
        res.send(result)
    })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);   




  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })