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

exports.addPost = addPost;
