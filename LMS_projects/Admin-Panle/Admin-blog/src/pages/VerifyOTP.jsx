import { useNavigate } from 'react-router-dom';

export default function VerifyOTP() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-light text-brand-light mb-4">Security Check</h2>
        <p className="text-brand-light/50 mb-10 text-sm tracking-widest uppercase">Verification Code</p>
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <input key={i} type="text" maxLength="1" className="w-16 h-20 text-center text-3xl font-light bg-transparent border-b-2 border-brand-light/20 text-brand-light focus:border-brand-light outline-none transition-all" />
          ))}
        </div>
        <button onClick={() => navigate('/login')} className="w-full py-4 bg-brand-light text-brand-dark font-bold rounded-full hover:bg-brand-light/90 transition-all">Verify Now</button>
        <button className="mt-8 block w-full text-xs text-brand-light/40 hover:text-brand-light uppercase tracking-widest">Resend Code</button>
      </div>
    </div>
  );
}