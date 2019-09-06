const PostController = require('../controllers/post.controller.js');

module.exports = function (app) {
    app.post('/addPost',PostController.addPost);
    app.get('/listPost',PostController.listPosts);
    app.get('/listPost/:id',PostController.UserPosts);
    app.put('/listPost/:id/update',PostController.UpdatePost);
    app.delete('/listPost/:id/delete',PostController.DeletePost);
}