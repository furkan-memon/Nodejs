import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-light text-brand-light mb-4">Reset Access</h2>
        <p className="text-brand-light/50 mb-8 text-sm">Enter your email for a security code.</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate('/verify-otp'); }} className="space-y-6">
          <input type="email" placeholder="Email address" required className="w-full px-5 py-4 bg-brand-dark border border-brand-light/20 text-brand-light rounded-xl focus:border-brand-light outline-none" />
          <button className="w-full py-4 bg-brand-light text-brand-dark font-bold rounded-xl shadow-lg">Send OTP</button>
        </form>
      </div>
    </div>
  );
}