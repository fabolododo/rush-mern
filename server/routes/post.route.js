const PostController = require('../controllers/post.controller.js');

module.exports = function (app) {
    app.post('/addPost',PostController.addPost);
    app.get('/listPost',PostController.listPosts);
    app.get('/listPost/:userId',PostController.UserPosts);
    app.put('/listPost/:idPost/update',PostController.UpdatePost);
    app.delete('/listPost/:idPost/delete',PostController.DeletePost);
}