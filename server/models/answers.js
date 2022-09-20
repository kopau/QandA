const client = require('../db/db.js');

module.exports = {
  listAnswers: (params) => {

  },

  addAnswer: (params) => {
    let addAnswerQuery = `
      INSERT INTO answers
      (answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
      VALUES ($1, $2, $3, $4, $5, $6, 'false', 0)`;
    return db.query(addAnswerQuery, params);
  },

  markAnswerHelpful: (params) => {
    let helpfulQuery = `
      UPDATE answers
      SET helpfulness = helpfulness + 1
      WHERE answer_id = $1`;
    return db.query(helpfulQuery, params);
  },

  reportAnswer: (params) => {
    let reportQuery = `
      UPDATE answers
      SET reported = true
      WHERE answer_id = $1`;
    return db.query(reportQuery, params);
  }
}