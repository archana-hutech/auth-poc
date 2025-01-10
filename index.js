const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const nodemailer = require('nodemailer')
let db = require("./models/db");
require("dotenv").config();
const port = process?.env?.port || 3001;
const signup_route = require("./controller/signup")
const login_route = require("./controller/login")
const password_routes = require("./controller/forgotPassword")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

db.sequelize
  .authenticate()
  .then((error) => {
    if (!error) {
      console.error(
        `express server connected to "${
          process?.env?.SERVERHOST || "NA"
        }" database "${process?.env?.DBNAME || "NA"}"`
      );
    } else {
      console.error(
        `express server is not cnnected to "${
          env?.SERVERHOST || "NA"
        }" database ${env?.DBNAME || "NA"}`
      );
    }
    db.sequelize.sync();
  })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
  });


app.get("/", (req, res) => {
    res.send("welcome to localhost");
  });


app.use("/api/user", signup_route);
app.use("/api/user", login_route);
app.use('/api/user', password_routes)

//   // Configure the email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // use your email service
//   auth: {
//       user: 'archana@hutechsolutions.com', // replace with your email
//       pass: 'ixwu azdx boqu ysov'   // replace with your email password
//   }
// });

// // Endpoint to send email
// app.post('/send-email', (req, res) => {
//   const { to, subject, text } = req.body;

//   const mailOptions = {
//       from: 'archana@hutechsolutions.com', // replace with your email
//       to: to,
//       subject: subject,
//       text: text
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return res.status(500).send(error.toString());
//       }
//       res.status(200).send('Email sent: ' + info.response);
//   });
// });
// const crypto = require('crypto');


// const secret = crypto.randomBytes(64).toString('hex');

app.listen(port, (err) => {
  if (!err) {
    console.log("server running at port 3001");
  }
});

