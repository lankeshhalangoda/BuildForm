import React from 'react';
import '../styles/FormEditor.css'; // Reuse styles for consistency

const FormEditor = ({ content, imagePlacement }) => {
  const containerStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  const contentWrapperStyle = {
    flexDirection: imagePlacement === 'left' ? 'row' : 'row-reverse',
  };

  return (
    <div className="form-editor" style={containerStyle}>
      <div className="content-wrapper" style={contentWrapperStyle}>
        <div className="text-content">
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="actions">
            <button className="start-button">
              {content.buttonText || 'Start'}
            </button>
            <div className="press-enter">
              <span className="press">press</span>
              <span className="enter"><strong>Enter</strong></span>
              <span className="enter-icon">↩</span>
            </div>
          </div>
        </div>
        {content.image && <img src={content.image} alt="Uploaded" className={`form-image ${imagePlacement}`} />}
      </div>
    </div>
  );
};

export default FormEditor;
