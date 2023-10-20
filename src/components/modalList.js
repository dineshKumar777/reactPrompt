import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element as the accessible element for screen readers

const data = ["Grammar", "storyteller", "coder", "interviewer", "educator"];

function MyModal({ isOpen, onRequestClose }) {
  const [search, setSearch] = useState("");

  const handleModalClose = () => {
    setSearch(""); // Reset the search input when the modal is closed
    onRequestClose(); // Call the parent component's onRequestClose function
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && filteredData.length > 0) {
      // Show the first result in an alert box
      alert(`Result: ${filteredData[0]}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      contentLabel="List of Data"
    >
      <h2>List of Data</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      {filteredData.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <button onClick={handleModalClose}>Close</button>
    </Modal>
  );
}

export default MyModal;
