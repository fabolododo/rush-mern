const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  text: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  likes: [
      {
        user: {
            type: Schema.types.ObjectId,
            ref: "users"
        },
      }
  ],

  comments: [
      {
          user: {
              type: Schema.types.ObjectId,
              ref: "users"
          },
          text: {
            type: String,
            required: true,
          },
          name: {
            type: String,
          },
      }
  ],

  createdAt: {
      type: Date,
      default: Date.now
    },
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;