const axios = require("axios");

axios.post(
  "http://4.224.186.213/evaluation-service/register",
  {
    email: "kalyankumarnaik@gmail.com",
    name: "kalyan kumar naik",
    mobileNo: "9515641054",
    githubUsername: "kalyankumarnaik",
    rollNo: "23BQ1A61B4",
    accessCode: "QQdEYy"
  }
)
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.log(error.response?.data || error.message);
});