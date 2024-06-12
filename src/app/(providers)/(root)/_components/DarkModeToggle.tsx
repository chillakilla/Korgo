'use client';

import React, { useEffect, useState } from 'react';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode === 'true' || storedDarkMode === 'false') {
        setDarkMode(storedDarkMode === 'true');
      } else {
        localStorage.removeItem('darkMode');
      }
    } catch (error) {
      console.error('Error reading darkMode from localStorage', error);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <button className="flex bg-slate-200 rounded p-1" onClick={toggleDarkMode}>
        {darkMode ? <MdOutlineLightMode className="size-5" /> : <MdLightMode className="size-5" />}
      </button>
    </div>
  );
}
