import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FormEditor from './components/FormEditor';
import './App.css'; // Custom styles

const App = () => {
  const [editorContent, setEditorContent] = useState({
    title: 'Welcome to our form',
    description: 'This is a description of the form',
  });
  const [imagePlacement, setImagePlacement] = useState('left');

  return (
    <div className="app">
      <Sidebar setEditorContent={setEditorContent} imagePlacement={imagePlacement} setImagePlacement={setImagePlacement} />
      <FormEditor content={editorContent} imagePlacement={imagePlacement} />

    </div>
  );
};

export default App;
