require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, '')));

// Configurar el servicio de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint para recibir el formulario
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'sofccey@gmail.com',
        subject: `Nuevo mensaje de ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error al enviar correo:", error); // <-- Imprime error
            return res.status(500).send('Error al enviar el correo');
        }
        console.log("✅ Correo enviado:", info.response); // <-- Confirma envío
        res.status(200).send('Correo enviado exitosamente');
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});

