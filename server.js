// create the server
const exp = require('express');
const app = exp()
const cors = require('cors')
app.listen(3500,()=>{console.log('server is running on the port 3500 ')})

//requires
const accountsApp = require('./APIs/AccountsApi') 
const blogsApp = require('./APIs/Blogs')
const mClient = require('mongodb').MongoClient

//middle wares
app.use(exp.json())
app.use(cors())
 
//connect to Database 
mClient.connect('mongodb://127.0.0.1:27017')
.then(dbServerRef=>{
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
//invalid path middleware
const invalidPathMiddleWare = (req,res)=>{
    console.log('Invalid Path:');
    res.status(404).json({message:'Invalid Path'});
}
app.use('*',invalidPathMiddleWare)