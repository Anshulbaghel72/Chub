import { useState } from 'react';
import { motion } from 'framer-motion';

function SpinProfile() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  
  // Toggle spin effect on click
  const toggleSpin = () => setIsSpinning(!isSpinning);

  return (
    <div className="User-spin fixed z-0 bottom-10 right-10 cursor-pointer hover:scale-110 transition-transform duration-500">
      {/* Motion component for smooth spinning */}
      <motion.div
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 1, repeat: isSpinning ? Infinity : 0 }}
        onClick={toggleSpin}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="spin"
          className="h-14 w-14 rounded-full shadow-lg border-2 border-blue-500"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        />
      </motion.div>

      {/* Conditional profile details box */}
      {showDetails && (
        <div className="absolute bottom-20 right-0 bg-white shadow-md rounded-lg p-4 w-48 text-center">
          <h3 className="text-lg font-semibold">User Profile</h3>
          <p className="text-sm text-gray-500">@username123</p>
          <button
            onClick={() => alert('Go to Profile')}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
          >
            View Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default SpinProfile;
