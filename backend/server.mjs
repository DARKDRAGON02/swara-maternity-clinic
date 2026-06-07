import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected securely...'))
  .catch(err => console.error('Database connection breakdown:', err));

// 2. Schema with Status State (pending, approved, rejected)
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: String,
  status: { type: String, default: 'pending' }, // Tracks approval status
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// 3. Email Engine
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 4. STEP 1: Patient submits a request from the frontend
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, phone, date, time, note } = req.body;

    // Save to database as 'pending'
    const newAppointment = new Appointment({ name, email, phone, date, time, note, status: 'pending' });
    await newAppointment.save();

    const appointmentId = newAppointment._id;

    // Send Alert to Doctor with Action Buttons pointing to our server endpoints
    const doctorMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.DOCTOR_EMAIL,
      subject: `🚨 Action Required: Appointment Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #4a2825; max-width: 600px; border: 2px solid #fbcbc4; border-radius: 16px; background-color: #fff6f5;">
          <h2 style="color: #d97870; font-family: Georgia, serif; border-bottom: 2px solid #fde7e4; padding-bottom: 8px;">New Consultation Request</h2>
          <p>A patient has requested a slot. Review the options below to notify them automatically:</p>
          
          <table style="width: 100%; text-align: left; margin: 20px 0; border-collapse: collapse;">
            <tr><th style="padding: 6px 0; color: #be5e56;">Patient Name:</th><td>${name}</td></tr>
            <tr><th style="padding: 6px 0; color: #be5e56;">Target Date:</th><td>${date}</td></tr>
            <tr><th style="padding: 6px 0; color: #be5e56;">Window:</th><td>${time === 'morning' ? 'Morning Slot' : 'Evening Slot'}</td></tr>
            <tr><th style="padding: 6px 0; color: #be5e56;">Phone:</th><td>${phone}</td></tr>
            <tr><th style="padding: 6px 0; color: #be5e56;">Notes:</th><td>${note || 'None'}</td></tr>
          </table>

          <div style="margin-top: 30px; text-align: center;">
            <a href="http://localhost:5000/api/appointments/action/${appointmentId}/approve" style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; margin-right: 10px; display: inline-block;">✔ ACCEPT SLOT</a>
            <a href="http://localhost:5000/api/appointments/action/${appointmentId}/reject" style="background-color: #c62828; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">❌ DECLINE / HOLIDAY</a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(doctorMailOptions);
    res.status(201).json({ success: true, message: 'Request submitted. Doctor notified.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Error' });
  }
});

// 5. STEP 2: Doctor clicks "ACCEPT" inside her email app
app.get('/api/appointments/action/:id/approve', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.id || req.params.id);
    if (!appointment) return res.send("<h3>Error: Appointment record not found.</h3>");

    appointment.status = 'approved';
    await appointment.save();

    // Send Official Confirmation to the Patient
    const patientMailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.email,
      subject: `🌸 Confirmed: Your Appointment with Dr. B Pruthvi`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #d97870; border-radius: 16px;">
          <h2 style="color: #d97870; font-family: Georgia, serif;">Your Slot is Officially Confirmed!</h2>
          <p>Dear ${appointment.name},</p>
          <p>We are pleased to inform you that <strong>Dr. B Pruthvi</strong> has reviewed and accepted your consultation request.</p>
          <div style="background-color: #fff6f5; padding: 15px; border-radius: 12px; border: 1px solid #fbcbc4; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Confirmed Date:</strong> ${appointment.date}</p>
            <p style="margin: 4px 0;"><strong>Timeframe Window:</strong> ${appointment.time === 'morning' ? 'Morning (09:30 AM - 01:00 PM)' : 'Evening (05:00 PM - 08:30 PM)'}</p>
          </div>
          <p>If you need to make any alterations or update your trimester parameters, please call our clinic front desk registry at your earliest convenience.</p>
          <p>We look forward to guiding you through a safe wellness track.</p>
          <hr style="border: 0; border-top: 1px solid #fde7e4; margin: 20px 0;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Dr. B Pruthvi Maternity Clinic • Bengaluru</p>
        </div>
      `
    };

    await transporter.sendMail(patientMailOptions);
    
    // Show a success tab page to the doctor in her browser
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: #2e7d32;">✔ Appointment Accepted Successfully</h2>
        <p>A confirmation email receipt has been pushed out to <strong>${appointment.email}</strong>.</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send("System processing error.");
  }
});

// 6. STEP 3: Doctor clicks "REJECT / HOLIDAY" inside her email app
app.get('/api/appointments/action/:id/reject', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.id || req.params.id);
    if (!appointment) return res.send("<h3>Error: Record missing.</h3>");

    appointment.status = 'rejected';
    await appointment.save();

    // Send Reschedule Note to Patient
    const patientMailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.email,
      subject: `Clinic Notice: Re-scheduling Appointment Request`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; max-width: 600px; border: 1px solid #ccc; border-radius: 16px;">
          <h2 style="color: #c62828; font-family: Georgia, serif;">Schedule Notice</h2>
          <p>Dear ${appointment.name},</p>
          <p>Thank you for submitting your consultation parameters. Due to unexpected adjustments in Dr. B Pruthvi's surgical theater panel schedule or an official clinic closure/holiday on <strong>${appointment.date}</strong>, we are unable to fulfill this exact window slot.</p>
          <p>Our desk manager will call you immediately at <strong>${appointment.phone}</strong> to shift your file timeline to the next available clinical screening block.</p>
          <p>Thank you for your understanding.</p>
        </div>
      `
    };

    await transporter.sendMail(patientMailOptions);

    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: #c62828;">❌ Request Declined</h2>
        <p>The patient has been notified that the clinic is unavailable and requires manual rescheduling.</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send("System processing error.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend tracking running on port ${PORT}`));