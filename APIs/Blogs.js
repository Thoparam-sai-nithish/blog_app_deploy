const exp = require('express')
const blogsApp = exp.Router();
const expAsyncHandler = require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs =require('bcryptjs');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

blogsApp.use(bodyParser.json())
blogsApp.use(exp.json())

blogsApp.post('/postBlog',expAsyncHandler(async(req,res)=>{
    const accountsCollectionObj = req.app.get('accountsCollectionObj');
    const blogsCollectionObj = req.app.get('blogsCollectionObj')
    const newBlog = req.body
    //add the blogId 
    let blogId = -1;
    const dbBlog = await blogsCollectionObj.findOne({ email: newBlog.email }, { sort: { blogId: -1 } })
    console.log('blog of database',dbBlog)
    if(dbBlog == null) blogId = 1
    else blogId = dbBlog.blogId+1;
    
    newBlog.blogId = blogId
    console.log('new blog',newBlog)

    await blogsCollectionObj.insertOne(newBlog)
    res.status(200).send({success:true,message:'Blog inserted successfuly'})
}))

blogsApp.post('/allBlogs',(expAsyncHandler(async(req,res)=>{
    const blogsCollectionObj = req.app.get('blogsCollectionObj')
    const allBlogs = await blogsCollectionObj.find().toArray();
    console.log(allBlogs)
    res.status(200).send({success:true,payload:allBlogs});
})))

     
module.exports=blogsApp