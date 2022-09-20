const models = require('../models');

module.exports = {
  listQuestions: (req, res) => {
    // let product_id = req.params.product_id;
    // let page = req.body.page || 1;
    // let count = req.body.count || 5;

    // models.questions.getQuestions(product_id, page, count, (err, result)

    models.questions.listQuestions()
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.error(err);
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
            console.error('-----THIS IS THE ERROR----', error);
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