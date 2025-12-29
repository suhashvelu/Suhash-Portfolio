import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/suhash-portfolio';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_env';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Schema & Model
const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        message: { type: String, required: true },
        token: { type: String, required: true },
    },
    { timestamps: true }
);

const ContactUser = mongoose.model('ContactUser', contactSchema);

// Helpers
const createTokenForEmail = (email) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
};

// Routes
// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
// POST: Submit contact form and get token
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log('Received contact submission:', { name, email, message });

        if (!name || !email || !message) {
            console.warn('Submission missing fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 1. Save to Database (existing logic)
        let user = await ContactUser.findOne({ email });

        if (!user) {
            console.log('Creating new user/submission for:', email);
            const token = createTokenForEmail(email);
            user = await ContactUser.create({
                name,
                email,
                message,
                token,
            });
        } else {
            console.log('Updating existing user/submission for:', email);
            user.name = name;
            user.message = message;
            await user.save();
        }

        // 2. Send Email Notification
        // Check if email credentials are set
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'suhashvelu03@gmail.com', // The admin email
                subject: `New Portfolio Contact from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                        ${message.replace(/\n/g, '<br>')}
                    </blockquote>
                `,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (emailErr) {
                console.error('Error sending email:', emailErr);
                // Don't fail the request if email fails, but log it
            }
        } else {
            console.warn('EMAIL_USER or EMAIL_PASS not set within .env - skipping email send.');
        }

        console.log('Submission saved successfully.');
        return res.json({
            success: true,
            token: user.token,
            email: user.email,
        });
    } catch (err) {
        console.error('Error in POST /api/contact:', err);
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Server error' });
    }
});

// GET: Retrieve messages (Protected Route)
app.get('/api/messages', authenticateToken, async (req, res) => {
    try {
        // req.user is populated by authenticateToken
        const email = req.user.email;
        const user = await ContactUser.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User data not found.' });
        }

        res.json({
            name: user.name,
            email: user.email,
            message: user.message,
            submittedAt: user.updatedAt
        });
    } catch (err) {
        console.error('Error in GET /api/messages:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


