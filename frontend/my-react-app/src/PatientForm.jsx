import { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    symptoms: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure this URL matches your Node.js server port
      const response = await axios.post('http://65.2.37.53:5000/api/register', formData);
      alert(response.data.message);
      // Reset form after success
      setFormData({ name: '', age: '', gender: 'Male', symptoms: '' });
    } catch (err) {
      console.error(err);
      alert("Error saving patient. Check if backend is running.");
    }
  };

  return (
    <div className="container">
      <h2>Patient Registration form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <input 
            type="number" 
            placeholder="Age" 
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <select 
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Arshit">Arshit(chuda)</option>
          </select>
        </div>

        <div className="input-group">
          <textarea 
            placeholder="Symptoms (e.g. Fever, Cough)" 
            value={formData.symptoms}
            onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
            required 
          />
        </div>

        <button type="submit">Register Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;