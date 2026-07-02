import { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the data to the backend
      const res = await axios.post('http://65.2.37.53:4000/api/register-patient', formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error registering patient");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Patient Name" 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
      />
      <input 
        type="number" 
        placeholder="Age" 
        onChange={(e) => setFormData({...formData, age: e.target.value})} 
      />
      <textarea 
        placeholder="Symptoms" 
        onChange={(e) => setFormData({...formData, symptoms: e.target.value})} 
      />
      <button type="submit">Register Patient</button>
    </form>
  );
};

export default PatientForm;