import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyTable.css";
import AddUserModal from "./AddUserModal";
import Snackbar from "@mui/material/Snackbar";

export default function MyTable({ settingPermission }) {
  const initialData = [
    { id: 1, name: "John", dept: "IT", progress: 75 },
    { id: 2, name: "Jane", dept: "HR", progress: 90 },
    { id: 3, name: "Doe", dept: "Finance", progress: 60 },
  ];

  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };

  const onFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filteredData = initialData.filter((item) =>
      item.dept.toLowerCase().includes(value)
    );
    setData(filteredData);
  };

  const deleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleInputChange = (e, key, index) => {
    const newData = [...data];
    newData[index][key] = e.target.value;
    setData(newData);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addUser = (newUser) => {
    setData([...data, { id: data.length + 1, ...newUser }]);
    toggleModal();
  };

  const navigate = useNavigate();
  const switchBack = () => {
    localStorage.setItem("isLoggedIn", "false");
    settingPermission(false);
    navigate("/"); // Always redirect to the login page
  };

  return (
    <>
      {showModal ? (
        <AddUserModal addUser={addUser} />
      ) : (
        <div>
          <div
            style={{
              float: "right",
              marginRight: "30px",
              position: "absolute",
              right: "10%",
              // backgroundColor: "red",
            }}
          >
            <button className="sign-out" onClick={switchBack}>
              Sign Out
            </button>
          </div>

          <div className="table-container">
            <span id="search-add-sec">
              <button className="add-user" onClick={toggleModal}>
                Add User
              </button>
              <input
                type="text"
                placeholder="Search by department"
                value={searchQuery}
                onChange={onFilter}
                className="search-bar"
              />
            </span>

            <table>
              <thead>
                <tr>
                  <th>
                    ID
                    <button className="sort-button" onClick={onSort}>
                      sort
                    </button>
                  </th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      {editingIndex === index ? (
                        <span>{item.id}</span>
                      ) : (
                        item.id
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          value={item.name}
                          onChange={(e) => handleInputChange(e, "name", index)}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          value={item.dept}
                          onChange={(e) => handleInputChange(e, "dept", index)}
                        />
                      ) : (
                        item.dept
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          value={item.progress}
                          onChange={(e) =>
                            handleInputChange(e, "progress", index)
                          }
                        />
                      ) : (
                        item.progress
                      )}
                      %
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <button onClick={() => handleSave(index)}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(index)}>Edit</button>
                      )}
                      <button onClick={() => deleteData(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
