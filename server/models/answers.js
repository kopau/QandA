const db = require('../db/db.js');

module.exports = {
  listAnswers: (params) => {
    let listAnswersQuery = `
      SELECT answer_id, body, date, answerer_name, helpfulness
      FROM answers
      WHERE question_id = $1 AND reported = FALSE
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

    return db.query(listAnswersQuery, params)
      .then(async (results) => {
        let data = await Promise.all(results.rows.map(mapAnswers))
        return data;
      })
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
  },

  getFinalAnswerId: () => {
    return db.query(`
      SELECT answer_id
      FROM answers
      ORDER BY answer_id DESC
      LIMIT 1`);
  },

  addAnswerPhotos: (params) => {
    let addPhotoQuery = `
      INSERT INTO photos
      (id, answer_id, url)
      VALUES ($1, $2, $3)`;
    return db.query(addAnswerQuery, params)
  },

  getFinalPhotoId: () => {
    return db.query(`
    SELECT id
    FROM photos
    ORDER BY id DESC
    LIMIT 1`);
  }
}