import React, { useState, useRef } from 'react';
import '../styles/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faUpload, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setEditorContent, imagePlacement, setImagePlacement }) => {
  const [title, setTitle] = useState('Welcome to our form');
  const [description, setDescription] = useState('This is a description of the form.');
  const [buttonText, setButtonText] = useState('Start');
  const [imagePreview, setImagePreview] = useState(null);
  const [cachedImage, setCachedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isNameOverlayVisible, setIsNameOverlayVisible] = useState(false);
  const [isEmailOverlayVisible, setIsEmailOverlayVisible] = useState(false);
  const [isEmailRequired, setIsEmailRequired] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const fileInputRef = useRef(null);

  const updateForm = (field, value) => {
    setEditorContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setCachedImage(file);
      updateForm('image', imageUrl);
    }
  };

  const handleSave = async () => {
    let finalImageUrl = imagePreview;

    if (cachedImage) {
      const formData = new FormData();
      formData.append('image', cachedImage);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.filePath) {
          finalImageUrl = `http://localhost:5000${data.filePath}`;
        }
      } catch (err) {
        console.error('Error saving file:', err);
      }
    }

    updateForm('image', finalImageUrl);
    updateForm('title', title);
    updateForm('description', description);
    updateForm('buttonText', buttonText);
  };

  const handleDiscard = () => {
    setTitle('Welcome to our form');
    setDescription('This is a description of the form.');
    setButtonText('Start');
    setImagePreview(null);
    setCachedImage(null);
    updateForm('title', 'Welcome to our form');
    updateForm('description', 'This is a description of the form.');
    updateForm('buttonText', 'Start');
    updateForm('image', '');
  };

  return (
    <div className={`sidebar ${isFormVisible ? 'form-hidden' : ''}`}>
      {isFormVisible && <div className="overlay" onClick={() => setIsFormVisible(false)} />}

      <div className="sidebar-header">
        <FontAwesomeIcon icon={faHome} /> Dashboard &gt; Demo Form
        <FontAwesomeIcon icon={faCog} style={{ marginLeft: 'auto' }} />
      </div>

      <div className="sidebar-tabs">
        <div className={`tab ${activeTab === 'content' ? 'selected' : ''}`} onClick={() => setActiveTab('content')}>Content</div>
        <div className={`tab ${activeTab === 'design' ? 'selected' : ''}`} onClick={() => setActiveTab('design')}>Design</div>
        <div className={`tab ${activeTab === 'share' ? 'selected' : ''}`} onClick={() => setActiveTab('share')}>Share</div>
        <div className={`tab ${activeTab === 'replies' ? 'selected' : ''}`} onClick={() => setActiveTab('replies')}>Replies</div>
      </div>

      {activeTab === 'content' && (
        <>
          <button className="welcome-button" onClick={() => setIsFormVisible(!isFormVisible)}>
            Welcome Screen
          </button>
          <button className="welcome-button" onClick={() => setIsNameOverlayVisible(true)}>Enter Your Name</button>
          <button className="welcome-button" onClick={() => setIsEmailOverlayVisible(true)}>Enter Your Email</button>
        </>
      )}

      {/* Welcome Screen Overlay */}
      <div className={`form-container ${isFormVisible ? 'form-visible slide-in' : ''}`}>
        <div className="form-header">
          <span>
            <FontAwesomeIcon icon={faCog} />&nbsp;&nbsp;Settings
          </span>
          <span className="close-btn" onClick={() => setIsFormVisible(false)}>&times;</span>
        </div>
        <div className="form-fields">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateForm('title', e.target.value);
            }}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              updateForm('description', e.target.value);
            }}
          />
          <label>Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => {
              setButtonText(e.target.value);
              updateForm('buttonText', e.target.value);
            }}
          />
          <div className="upload-btn" onClick={() => fileInputRef.current.click()}>
            <FontAwesomeIcon icon={faUpload} /> Upload
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Uploaded" />
              <button className="remove-image" onClick={() => {
                setImagePreview(null);
                setCachedImage(null);
                updateForm('image', '');
              }}>Remove Image</button>
            </div>
          )}
          <div className="image-placement">
            <span>Placement</span>
            <button className="placement-btn" onClick={() => setImagePlacement('left')}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button className="placement-btn" onClick={() => setImagePlacement('right')}>
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
          </div>
          <div className="button-group">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="discard-button" onClick={handleDiscard}>Discard</button>
          </div>
        </div>
      </div>

      {/* Name Overlay */}
      {isNameOverlayVisible && (
        <div className={`form-container slide-in ${isNameOverlayVisible ? 'form-visible' : ''}`}>
          <div className="form-header">
            <span>Enter Your Name</span>
            <span className="close-btn" onClick={() => setIsNameOverlayVisible(false)}>&times;</span>
          </div>
          <div className="form-fields">
            <label>Title</label>
            <input type="text" />
            <label>Description</label>
            <input type="text" />
            <div className="button-group">
              <button className="save-button" onClick={() => setIsNameOverlayVisible(false)}>Save</button>
              <button className="discard-button" onClick={() => setIsNameOverlayVisible(false)}>Discard</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Overlay */}
      {isEmailOverlayVisible && (
        <div className={`form-container slide-in ${isEmailOverlayVisible ? 'form-visible' : ''}`}>
          <div className="form-header">
            <span>Enter Your Email</span>
            <span className="close-btn slide-out" onClick={() => setIsEmailOverlayVisible(false)}>&times;</span>
          </div>
          <div className="form-fields">
            <label>Title</label>
            <input type="text" />
            <label>Description</label>
            <input type="text" />
            <label>Required</label>
            <div className="toggle-switch">
              <input 
                type="checkbox" 
                checked={isEmailRequired} 
                onChange={() => setIsEmailRequired(!isEmailRequired)} 
              />
              <span className="toggle-label">{isEmailRequired ? 'Yes' : 'No'}</span>
            </div>
            <div className="button-group">
              <button className="save-button" onClick={() => setIsEmailOverlayVisible(false)}>Save</button>
              <button className="discard-button" onClick={() => setIsEmailOverlayVisible(false)}>Discard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
