const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS)
app.use(express.static('.'));

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brxxxnt@gmail.com', // Replace with your Gmail address
    pass: 'brentKDOT445'  // Replace with your Gmail app password (not regular password)
  }
});

// Route to handle message submission
app.post('/send-message', (req, res) => {
  const message = req.body.message;

  const mailOptions = {
    from: 'brxxxnt@gmail.com', // Same as auth user
    to: 'avrielcerbito@gmail.com',
    subject: 'New Anonymous Message',
    text: `You received an anonymous message:\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('<html><body><h1>Sorry, there was an error sending your message.</h1><button onclick="window.close()">Close</button></body></html>');
    } else {
      console.log('Email sent:', info.response);
      res.send('<html><head><style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; } button { padding: 10px 20px; font-size: 16px; }</style></head><body><h1>Thanks for sending :></h1><button onclick="window.close()">Close</button></body></html>');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
