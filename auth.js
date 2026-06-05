const axios = require("axios");

axios.post(
  "http://4.224.186.213/evaluation-service/auth",
  {
    email: "kalyankumarnaik@gmail.com",
    name: "kalyan kumar naik",
    rollNo: "23bq1a61b4",
    accessCode: "QQdEYy",
    clientID: "62e77c7d-6570-422c-a9b0-31344cb0dcf1",
    clientSecret: "PGcCCEgDyNKbDJUB"
  }
)
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.log(error.response?.data || error.message);
});