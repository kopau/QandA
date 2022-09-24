import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // vus: 1,
  // vus: 100,
  vus: 1000,
  duration: '15s'
};

const id = Math.ceil(Math.random() * 3000000)

// export default function () {
//   http.get(`http://localhost:3000/qa/questions/product_id=${id}?page=1&count=5`);
//   sleep(1);
// }

export default function () {
  http.get(`http://localhost:3000/qa/questions?question_id=${id}/answers?page=1&count=5`);
  sleep(1);
}

// export default function () {
//   http.get(`http://localhost:3000/qa/questions?product_id=${id}?page=1&count=5`);
//   sleep(1);
// }

// export default function () {
//   http.get(`http://localhost:3000/qa/questions?product_id=${id}?page=1&count=5`);
//   sleep(1);
// }

// export default function () {
//   http.get(`http://localhost:3000/qa/questions?product_id=${id}?page=1&count=5`);
//   sleep(1);
// }