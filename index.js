const sgMail = require("@sendgrid/mail");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.post("/api/email", async (req, res) => {
  const { name, from, title, content } = req.body;
  try {
    if (name && from && title && content) {
      sgMail.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        to: "marcosvims@gmail.com", // Change to your recipient
        from: "vinidevms@gmail.com", // Change to your verified sender
        subject: title,
        text: "and easy to do anywhere, even with Node.js",
        html: `<h3>Nome: ${name}</h3><br><h3>email: ${from}</h3><br><p>${content}<p>`,
      };

      const response = await sgMail.send(msg);

      res.status(200).send("enviado");
    } else {
      res.json({ error: "preencha todos os campos" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error.message);
  }
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
