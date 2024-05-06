import React, { useState } from "react";
import "./MyTable.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function AddUserModal(props) {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      dept,
      progress: parseInt(progress),
    };
    props.addUser(newUser);
    // Reset input fields after submission
    setName("");
    setDept("");
    setProgress("");
    // Display toast notification
    notify();
  };

  const notify = () => {
    // Calling toast method by passing string
    toast.success("User added successfully!");
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="modal-text-section">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="modal-content"
          />
        </div>
        <div className="modal-text-section">
          <label htmlFor="dept">Department:</label>
          <input
            type="text"
            id="dept"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            required
            className="modal-content"
          />
        </div>
        <div className="modal-text-section">
          <label htmlFor="progress">Progress:</label>
          <input
            type="number"
            id="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            required
            className="modal-content"
          />
        </div>
        <button
          className="submit-button"
          type="submit"
          onClick={() =>
            Swal.fire({
              title: "User added successfully",
              icon: "success",
            })
          }
        >
          Add
        </button>
      </form>
    </div>
  );
}
