require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require('./app/routes/user');

const connectDB = require('./app/database/connectDB')
const app = express();
const PORT = process.env.PORT || 3001;

connectDB()

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(
  express.json({
    limit: "10mb",
  }),
);
app.set("port", process.env.PORT);
app.set("host", process.env.HOST);

// Quand il reçoit une requête visant cet endpoint
// https://iia-backend.onrender.com//api/data
// app.post("/api/data", (req, res) => {
//   // const { ip } = req
//   const { email, password } = req.body;
//   console.log(email, password);
//   res.status(200).json({ message: "connexion réuissie" });
// });


app.use('/api/v1/user', userRoutes)


app.listen(app.get("port"), function () {
  console.log(`Server running at ${app.get("host")} :  ${app.get("port")}`);
});

// app.listen(process.env.PORT, () => {
//   console.log(`✅ Server running at ${process.env.PORT}`);
// });

