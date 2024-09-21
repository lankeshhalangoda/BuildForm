import "../styles/Dashboard.css";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FormEditor from "./FormEditor";

const Dashboard = () => {
  const [selectedStep, setSelectedStep] = useState("welcome");
  const [formData, setFormData] = useState({
    title: "Welcome to our form",
    description: "This is a description of the form",
    imagePlacement: "left",
  });

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="dashboard">
      <Sidebar selectedStep={selectedStep} onStepChange={setSelectedStep} />
      <FormEditor
        selectedStep={selectedStep}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
};

export default Dashboard;
