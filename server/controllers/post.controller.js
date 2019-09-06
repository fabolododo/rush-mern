const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");


async function addPost(req, res) {
   //   try {
        const user = await User.findById(req.body.id).select('-password');
         console.log(req.body.post);
        let newPost = new Post({
            text: req.body.text,
            author: user.name,
            user: req.body.id
        });
        console.log(newPost);

        newPost.save(function(err) {
           if (err) {
              res.status(400);
              res.send(err);
              console.log("err ", err );
              console.log(err);
              return;
           }
           console.log({ newPost })
           res.send({ newPost })
        })

}

async function listPosts(req, res) {
   Post.find({}, function(err, posts) {
      if (err) {
         res.status(400);
         res.send(err);
         return;
      }
      res.send( posts )
   })
}


async function UserPosts(req, res) {

   Post.findById(req.params.id, function(err, posts){
     console.log(req.params.id);
     
     if(err){
       res.status(400);
       res.send('Something went wrong');
       return;
     }
     console.log(posts);
     
     res.send(posts);
   
   });
 
}

async function UpdatePost(req, res){
   console.log(req.body);
   Post.findByIdAndUpdate(req.params.id, { $set : req.body } , function(err, post){
       
      if(err){
        res.status(400);
        res.send(err);
        return;
      }
       res.send({post});
   });
};
   
   
async function DeletePost(req, res) {
   
   Post.findByIdAndRemove(req.params.id,function(err, post) {
      if(err){
         res.status(400)
            .send(err);
         return;
      }
      res.send({ post });
   });
}

   exports.DeletePost = DeletePost;
   exports.UpdatePost = UpdatePost;
   exports.UserPosts = UserPosts;
   exports.listPosts = listPosts;
   exports.addPost = addPost;
