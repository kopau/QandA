const models = require('../models');

module.exports = {
  listAnswers: (req, res) => {

  },

  addAnswer: (req, res) => {
    models.answers.getFinalAnswerId()
      .then((result) => {
        let nextId = result.rows[0].answer_id + 1;
        let a = req.body;
        let answerParams = [nextId, a.question_id, a.body, Date.now(), a.name, a.email]
        models.answers.addAnswer(answerParams)
          .then((result) => {
            models.answers.getFinalPhotoId()
              .then((result) => {
                let nextPhotoId = result.rows[0].id + 1;
                if (a.photos.length !== 0) {
                  a.photos.forEach((url) => {
                    let photoParams = [nextPhotoId, nextId, url]
                    nextPhotoId++
                    models.answers.addAnswerPhotos(photoParams)
                      .then((result) => {
                        res.status(201).json('Added photo')
                      })
                      .catch((error) => {
                        res.status(400).json('Unable to complete: Adding Answer Photo')
                      })
                  })
                }
              })
            })
          .catch((error) => {
            res.status(400).json('Unable to complete: Add an Answer')
          })
      })
  },

  markAnswerHelpful: (req, res) => {
    models.answers.markAnswerHelpful([req.params.answer_id])
      .then((result) => {
        res.status(204).json('Marked as helpful')
      })
      .catch((error) => {
        res.status(400).json('Unable to complete: Mark Answer as Helpful')
      })
  },

  reportAnswer: (req, res) => {
    models.answers.reportAnswer([req.params.answer_id])
      .then((result) => {
        res.status(204).json('Reported answer')
      })
      .catch((error) => {
        res.status(400).json('Unable to complete: Report Answer')
      })
  }
}