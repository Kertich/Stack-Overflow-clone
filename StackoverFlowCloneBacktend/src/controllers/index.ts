const answersController = require('./answers.controller');
const commentsController = require('./comments.controller');
// const postsController = require('./posts.controller');
// const tagsController = require('./tags.controller');
// const usersController = require('./users.controller');
// const authController = require('./auth.controller');

// module.exports = {
//   answersController,
//   commentsController,
//   postsController,
//   tagsController,
//   usersController,
//   authController,
// };


import { RequestHandler } from 'express';
import * as  AnswersController  from './answers.controller';
import * as  CommentsController  from './comments.controller';
import * as  PostsController  from './posts.controller';
import * as  TagsController  from './tags.controller';
import * as  UsersController  from './users.controller';
import * as AuthController  from './auth.controller';



export default { AnswersController, CommentsController, PostsController, TagsController, UsersController, AuthController}
