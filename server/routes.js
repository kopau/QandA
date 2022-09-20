const router = require('express').Router();
const controller = require('./controllers');

// Questions

router.get('/questions', controller.questions.listQuestions);

router.post('/questions', controller.questions.addQuestion);

router.put('/questions/:question_id/helpful', controller.questions.markQuestionHelpful);

router.put('/questions/:question_id/report', controller.questions.reportQuestion);

// Answers

router.get('/questions/:question_id/answers', controller.answers.listAnswers);

router.post('/questions/:question_id/answers', controller.answers.addAnswer);

router.put('/answers/:answer_id/helpful', controller.answers.markAnswerHelpful);

router.put('/answers/:answer_id/report', controller.answers.reportAnswer);

module.exports = router;