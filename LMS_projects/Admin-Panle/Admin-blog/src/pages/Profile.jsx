import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to Cloudinary or your server
      // For now, we create a local preview URL
      const previewUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePic: previewUrl });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full bg-white/5 border border-brand-light/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center">
        
        {/* Profile Image Circle */}
        <div className="relative inline-block mb-6">
          <img 
            src={user.profilePic} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-brand-light shadow-lg object-cover"
          />
          {/* Hidden File Input & Edit Icon */}
          <label className="absolute bottom-1 right-1 bg-brand-light p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>

        <h2 className="text-2xl font-bold text-brand-light">{user.fullName}</h2>
        <p className="text-brand-light/50 text-sm mb-8">{user.email}</p>

        <div className="space-y-4 text-left">
          <button className="w-full py-3 bg-brand-light text-brand-dark font-bold rounded-xl transition-all hover:bg-brand-light/90">
            Save Changes
          </button>
          <button className="w-full py-3 bg-transparent border border-brand-light/20 text-brand-light/60 font-medium rounded-xl hover:text-brand-light hover:border-brand-light transition-all">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}