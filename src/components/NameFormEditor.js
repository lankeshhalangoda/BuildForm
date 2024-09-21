import React, { useState } from 'react';

const NameFormEditor = ({ closeOverlay }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Name submitted:', name);
    closeOverlay();
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="text-input" // Apply existing styles
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <button onClick={closeOverlay}>Close</button>
    </div>
  );
};

export default NameFormEditor;
