const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  text: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },

  likes: [
      {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
      }
  ],

  comments: [
      {
          user: {
              type: Schema.Types.ObjectId,
              ref: "users"
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
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