import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VisaForm from './components/VisaForm';
import VisaResult from './components/VisaResult';
import './App.css';

function App() {
  const [visaInfo, setVisaInfo] = useState(null);

  return (
    <div className="flex flex-col justify-center items-center py-10 app-bg bg-gradient-to-br from-blue-100 to-blue-900 min-h-screen overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="md:flex-row flex-col flex gap-10 justify-center items-center md:p-10 text-center"
      >
        <motion.img
          src="https://w0.peakpx.com/wallpaper/388/1001/HD-wallpaper-a-beautiful-sunrise-over-the-clouds-lisbon-pt-airplane-sky-aesthetic-landscape-thumbnail.jpg"
          alt="Visa Checker"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8 h-96 w-80 md:w-96 max-w-96 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:scale-100 transition-all duration-500 ease-in-out"
        />

        <motion.div
          className="block"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-6 drop-shadow-lg">
           VisaBuddy 🌍
          </h1>
          <p className="text-lg font-semibold text-gray-900 mb-6 max-w-96 w-80">
            Planning to travel abroad but unsure about visa requirements? Don’t worry, you’re in the right place. VisaBuddy is your one-stop destination to check visa rules for any country, based on your nationality.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VisaForm setVisaInfo={setVisaInfo} />
          </motion.div>
        </motion.div>
      </motion.div>

      {visaInfo && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10"
        >
          <VisaResult visaInfo={visaInfo} />
        </motion.div>
      )}

      {/* Optional footer (animated if needed)
      <motion.div
        className="p-4 mt-4 text-center absolute bottom-0 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-sm text-white">© 2025 Made with 🤍 by Sneha</p>
      </motion.div>
      */}
    </div>
  );
}

export default App;
