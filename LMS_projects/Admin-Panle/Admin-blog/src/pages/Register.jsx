import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  // 1. Initialize state with keys matching the 'name' attributes of the inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // 2. Generic change handler to update state based on input name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    // Submit data to your API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-dark">
      <div className="max-w-md w-full p-10 rounded-3xl border border-brand-light/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-light text-brand-light text-center mb-6 tracking-tight">Join Us</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name" 
            className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none transition-all placeholder:text-brand-light/30" 
          />

          {/* Email Input */}
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none transition-all placeholder:text-brand-light/30" 
          />

          {/* Password Input */}
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none transition-all placeholder:text-brand-light/30" 
          />

          <button 
            type="submit"
            className="w-full py-4 bg-brand-light text-brand-dark font-bold rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-light/5"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-brand-light/60 mt-6">
          Already a member? <Link to="/login" className="text-brand-light font-bold hover:underline underline-offset-4">Login</Link>
        </p>
      </div>
    </div>
  );
}