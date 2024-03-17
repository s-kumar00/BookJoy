import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const ModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <button onClick={toggleDarkMode} className="text-2xl">
        {darkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default ModeSwitch;
