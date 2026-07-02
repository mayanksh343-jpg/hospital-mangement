import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure your CSS is imported

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Patients from Backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://65.2.37.53:5000/api/patients');
        setPatients(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // 2. Delete (Discharge) Patient Function
  const deletePatient = async (id) => {
    if (window.confirm("Are you sure you want to discharge this patient?")) {
      try {
        await axios.delete(`http://65.2.37.53:5000/api/patients/${id}`);
        // Update local state to remove the deleted patient
        setPatients(patients.filter(patient => patient._id !== id));
      } catch (err) {
        alert("Failed to delete patient. Ensure backend is running.");
      }
    }
  };

  // 3. Filter Logic for Search Bar
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loader">Connecting to Hospital Database...</div>;

  return (
    <div className="container">
      <div className="list-header">
        <h2>Patient Records</h2>
        <input 
          type="text" 
          placeholder="🔍 Search patients by name..." 
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Symptoms</th>
              <th>Date Registered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient._id}>
                  <td><strong>{patient.name}</strong></td>
                  <td>{patient.age}</td>
                  <td><span className="symptom-tag">{patient.symptoms}</span></td>
                  <td>{new Date(patient.appointmentDate || Date.now()).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="delete-btn" 
                      onClick={() => deletePatient(patient._id)}
                    >
                      Discharge
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="stats-footer">
        Total Patients: {filteredPatients.length}
      </div>
    </div>
  );
};

export default PatientList;