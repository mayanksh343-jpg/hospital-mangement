import express from 'express';
import { dbConnection } from './db/db.js';
import { Patient } from './models/patientSchema.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

dbConnection(); // Initialize DB

// POST: Save a new patient
app.post('/api/register', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: "Patient Saved to Database!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all patients
app.get('/api/patients', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});



app.listen(process.env.PORT, () => console.log("Server running"));







