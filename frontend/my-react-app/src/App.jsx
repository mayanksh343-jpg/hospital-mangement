import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PatientForm from "./PatientForm"; 
import PatientList from "./PatientList";

export default function App() {
  // Line 8 should be inside the return or a proper hook call
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#1e293b", color: "white" }}>
        <Link to="/" style={{ color: "white", marginRight: "1rem" }}>Register</Link>
        <Link to="/patients" style={{ color: "white" }}>Patients</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/patients" element={<PatientList />} />
      </Routes>
    </BrowserRouter>
  );
} 