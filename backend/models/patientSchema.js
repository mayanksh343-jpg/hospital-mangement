import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Arshit"] },
  symptoms: { type: String, required: true },
  appointmentDate: { type: Date, default: Date.now }
});

export const Patient = mongoose.model("Patient", patientSchema);