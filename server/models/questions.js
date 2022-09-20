const db = require('../db/db.js');

module.exports = {
  listQuestions: (params) => {
    // let questionQuery = `SELECT json_agg(json_build_object(
    //   '
    // )`
    return db.query('SELECT * FROM questions WHERE question_id = 1')

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