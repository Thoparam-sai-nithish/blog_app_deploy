// create the server
const exp = require('express');
require('dotenv').config()
const app = exp()
const cors = require('cors')
app.listen(3500,()=>{console.log('server is running on the port 3500 ')})

//requires
const accountsApp = require('./APIs/AccountsApi') 
const blogsApp = require('./APIs/Blogs')
const {MongoClient } = require('mongodb')


//middle wares
app.use(exp.json())
app.use(cors())

// ONLINE DB
const MONGODB_URI = process.env.MONGODB_URI
const client = new MongoClient (MONGODB_URI, {
    tlsAllowInvalidCertificates: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
  


// Connect to DB
client
.connect()
.then(async(dbServerRef)=>{
    const DB = dbServerRef.db('blog_app');
    const accountsCollectionObj = DB.collection('accounts')
    const blogsCollectionObj = DB.collection('blogs')
    app.set('accountsCollectionObj',accountsCollectionObj);
    app.set('blogsCollectionObj', blogsCollectionObj)
    console.log('Database connection Success!');
})
.catch((err)=>{
    console.log('error in Connecting to database! : ',err) 
})


//Routes
app.use('/accounts',accountsApp)
app.use('/blogs',blogsApp)

//error handling middleware
const errorHandlingMiddleWare = (err,req, res , next)=>{
    console.log('Error occured in server! Error is :' ,err);
    res.status(200).send({message:'error occured in the srever',error:err.message})
}
app.use(errorHandlingMiddleWare)

//Build Web Packserver
const path = require('path');
app.use(exp.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
});


//invalid path middleware
const invalidPathMiddleWare = (req,res)=>{
    console.log('Invalid Path:');
    res.status(404).json({message:'Invalid Path'});
}
app.use('*',invalidPathMiddleWare)
