const models = require('../models');

module.exports = {
  listQuestions: (req, res) => {
    let product_id = req.query.product_id;
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    let offset = (page - 1) * count;

    let params = [product_id, offset, count]

    let questionList = {};
    questionList.product_id = product_id;

    models.questions.listQuestions(params)
      .then((result) => {
        questionList.results = result;
        res.send(questionList)
      })
      .catch((error) => {
        console.error(error);
      })
  },

  addQuestion: (req, res) => {
    models.questions.getFinalQuestionId()
      .then((result) => {
        let nextId = result.rows[0].question_id + 1;
        let q = req.body;
        let questionParams = [nextId, q.body, Date.now(), q.name, q.email, q.product_id]
        models.questions.addQuestion(questionParams)
          .then((result) => {
            res.status(201).send('Question has been created')
          })
          .catch((error) => {
            res.status(400).send('Unable to complete: Add a Question', error)
          })

      })
  },

  markQuestionHelpful: (req, res) => {
    models.questions.markQuestionHelpful([req.params.question_id])
      .then((result) => {
        res.status(204).send('Marked as helpful')
      })
      .catch((error) => {
        res.status(400).send('Unable to complete: Mark Question as Helpful', error)
      })
  },

  reportQuestion: (req, res) => {
    models.questions.reportQuestion([req.params.question_id])
      .then((result) => {
        res.status(204).send('Reported question')
      })
      .catch((error) => {
        res.status(400).send('Unable to complete: Report Question', error)
      })
  }
}