import { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';

export default function Login() {
  // 2. Create state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 3. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-brand-dark">
      <div className="max-w-md w-full p-10 rounded-3xl border border-brand-light/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <h2 className="text-4xl font-light text-brand-light text-center mb-2 tracking-tight">Login</h2>
        <p className="text-brand-light/50 text-center mb-8 text-sm">Welcome back</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" // Added name attribute
            value={formData.email} // 4. Bind value to state
            onChange={handleChange} // 5. Bind change handler
            placeholder="Email" 
            className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none transition-all placeholder:text-brand-light/30" 
          />
          
          <input 
            type="password" 
            name="password" // Added name attribute
            value={formData.password} // 4. Bind value to state
            onChange={handleChange} // 5. Bind change handler
            placeholder="Password" 
            className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none transition-all placeholder:text-brand-light/30" 
          />

          <div className="text-right">
            <Link to="/forgot-password" size="sm" className="text-xs text-brand-light/50 hover:text-brand-light transition-colors">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-brand-light text-brand-dark font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-brand-light/60 mt-8">
          New here? <Link to="/register" className="text-brand-light font-bold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}