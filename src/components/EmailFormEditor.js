import React, { useState } from 'react';

const EmailFormEditor = ({ closeOverlay }) => {
  const [email, setEmail] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleRequired = () => {
    setIsRequired(!isRequired);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!isRequired || validateEmail(email)) {
      console.log('Email submitted:', email);
      closeOverlay();
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        className="text-input" // Apply existing styles
        required={isRequired}
      />
      <label>
        <input
          type="checkbox"
          checked={isRequired}
          onChange={toggleRequired}
        />
        Required
      </label>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={isRequired && !validateEmail(email)} // Disable if required and invalid
      >
        Submit
      </button>
      <button onClick={closeOverlay}>Close</button>
    </div>
  );
};

export default EmailFormEditor;
