const db = require('../db/db.js');

module.exports = {
  listQuestions: (params) => {
    let query = `
      SELECT question_id, question_body, question_date, asker_name, question_helpfulness
      FROM questions
      WHERE product_id = $1 AND reported = FALSE
      OFFSET $2 LIMIT $3`;

    const mapAnswers = (answer) => {
      let answerQuery = `
        SELECT id, url
        FROM photos
        WHERE answer_id = ${answer.answer_id}`

      return db.query(answerQuery)
        .then((results) => {
          if (results.rows.length === 0) {
            answer.photos = [];
          } else {
            answer.photos = results.rows;
          }
          return answer;
        })
    }

    const mapQuestions = (question) => {
      let questionQuery = `
        SELECT answer_id, body, date, answerer_name, helpfulness
        FROM answers
        WHERE question_id = ${question.question_id} AND reported = FALSE`

      question.answers = {};

      return db.query(questionQuery)
        .then((results) => {
          return Promise.all(results.rows.map(mapAnswers))
        })
        .then((answers) => {
          answers.forEach((answer) => {
            question.answers[answer.answer_id] = answer;
          })
          return question;
        })
    }

    return db.query(query, params)
      .then(async (results) => {
        let data = await Promise.all(results.rows.map(mapQuestions))
        return data;
      })
  },

  addQuestion: (params) => {
    let addQuestionQuery = `
      INSERT INTO questions
      (question_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported, product_id)
      VALUES ($1, $2, $3, $4, $5, 0, 'false', $6)`;
    return db.query(addQuestionQuery, params);
  },

  markQuestionHelpful: (params) => {
    let helpfulQuery = `
      UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id = $1`;
    return db.query(helpfulQuery, params);
  },

  reportQuestion: (params) => {
    let reportQuery = `
      UPDATE questions
      SET reported = true
      WHERE question_id = $1`;
    return db.query(reportQuery, params);
  },

  getFinalQuestionId: () => {
    return db.query(`
      SELECT question_id
      FROM questions
      ORDER BY question_id DESC
      LIMIT 1`);
  }
}