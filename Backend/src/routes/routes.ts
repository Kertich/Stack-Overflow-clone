const express = require('express');
const router = express.Router();
const sql = require('mssql');
import { logout } from './LogoutController';
import { LoginController } from './LoginController';
import { questionController } from './controllers/questionController';


import {
  getQuestions,
  getQuestion,
  postQuestion,
  deleteQuestion,
  editQuestion,
} from '../controllers/QuestionController';

import {
  displayLoginForm,
  handleLoginFormSubmission,
  handleLogout,
  displayForgotPasswordForm,
  handleForgotPasswordFormSubmission,
  displayResetPasswordForm,
  handleResetPasswordFormSubmission,
} from '../controllers/AuthController';

import { displayUserProfile } from '../controllers/UserController';


const router = Router();

// Define the logout route
router.get('/logout', logout);

// Define the login route
router.get('/login', LoginController);

//Define question route
router.get('/questions', questionController.getQuestions);
router.get('/questions/:id', questionController.getQuestion);
router.get('/questions/:id/edit', questionController.editQuestion);
router.put('/questions/:id', questionController.updateQuestion);
router.delete('/questions/:id', questionController.deleteQuestion);



// Questions
router.get('/questions', getQuestions);
router.get('/question/:id', getQuestion);
router.post('/question', postQuestion);
router.delete('/question/:id', deleteQuestion);
router.put('/question/:id', editQuestion);

// Answers
router.post('/answer', postAnswer);
router.post('/vote', postVote);




module.exports = router;
