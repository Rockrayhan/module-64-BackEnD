const express = require('express'); //1
const { MongoClient } = require('mongodb'); // 2
const cors = require('cors') //1
const app = express();  //1
const port = 5000   //1

const ObjectId = require('mongodb').ObjectId; // 7 (id er vitorer obj er jonno)


app.use(cors()) //1
app.use(express.json()) //1 json converter  

// user : practice-64
// pass : fFY5PGJ1K6anbucm



// 2 connect with db 
const uri = "mongodb+srv://practice-64:fFY5PGJ1K6anbucm@cluster0.shqkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 3 insert a data
        async function run() {
          try {
            await client.connect();
            const database = client.db("practice_1");
            const usersCollection = database.collection("users");
            
// 6 GET API (get data on UI) 
            app.get('/users', async(req, res) => {
              const cursor = usersCollection.find({})
              const users = await cursor.toArray()
              res.send(users);
            }); //6
// 7 DELETE API
            app.delete('/users/:id', async(req, res) => {
              const id = req.params.id ; // (for reading id)
              const query = { _id : ObjectId(id) } // ( for quering )
              result = await usersCollection.deleteOne(query);

              console.log( 'deleting user with id', result);
              res.json(result);
            })
// 8 UPDATE API            
            app.get('/users/:id', async(req , res) => {
              const id = req.params.id ;
              const query = {_id: ObjectId(id)}; // for quering by id
              const user = await usersCollection.findOne(query);
              console.log('load user with id : ' , id);
              res.send(user);
            })
//8
            //4 POST API 
            app.post('/users', async(req,res)=>{
// 5 send user              
              const newUser = req.body;
              const result = await usersCollection.insertOne(newUser);
              console.log('got new user', req.body);
              console.log('added user', result);
              res.json(result)
// 5               
              // res.send('hit the post'); // 4
            })

          } finally {
            // await client.close();
          }
        }
run().catch(console.dir);
// 3
//2

app.get('/', (req, res) => {
  res.send('requiest has been hitted') //1
})

app.listen(port, () => {
  console.log('port has been hitted', port); //1
})