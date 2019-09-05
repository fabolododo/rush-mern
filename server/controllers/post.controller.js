const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");


async function addPost(req, res) {
   
     try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json({ post });

     } catch (error) {
        console.error("request invalid");
        return res.status(500).json({ error });
        
     }
}


async function listPosts(req, res) {

   Post.find({},function (err, posts){
     if(err){
       res.send('Something went wrong');
       next();
     }
     res.json(posts);
   
   });
   
}

async function UserPosts(req, res) {
   console.log("avant le try")
   try {
      const post= await User.findById(req.params.id);
      
      if(!post) {
         console.log("dans le if le try")
         return res.status(404).json({ msg: 'Post not found'});
      }
      console.log("dans le try")
       res.json(post); 
   } 
   catch(err) { 
      console.log("dans le catch")
      console.error(err.message);
      if(err.kind === 'ObjectId') {
         console.log("dans le if du catch")
         return res.status(404).json({msg :'Post not found'})
      }
      res.status(500).send('Server Error');
   }
   console.log("apres le catch")

};


// async function UserPosts(req, res) {

//    User.findById(req.params.id, function(err, posts){
//      console.log(req.params.id);
     
//      if(err){
//        res.status(400);
//        res.send('Something went wrong');
//        return;
//      }
//      res.json(posts);
   
//    });
 
// }


async function UpdatePost(req, res){

Post.findByIdAndUpdate(req.params.id, { $set : newPost } , function(err, posts){
    
   if(err){
     res.status(400);
     res.send(err);
     return;
    }
    res.send({posts});
    });
};


async function DeletePost(req, res) {

   Post.findByIdAndRemove(req.params.id,function(err, posts){
     if(!posts)
     res.status(404).send('data not found');
     else
     
     posts.delete().then( posts => {
       res.json('Post deleted');
     })
   });
}


exports.DeletePost = DeletePost;
exports.UpdatePost = UpdatePost;
exports.UserPosts = UserPosts;
exports.listPosts = listPosts;
exports.addPost = addPost;
