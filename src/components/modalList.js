import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element as the accessible element for screen readers

const data = ["Grammar", "storyteller", "coder", "interviewer", "educator"];

function MyModal({ isOpen, updateSearchValue, onRequestClose }) {
  const [search, setSearch] = useState("");

  const handleModalClose = () => {
    setSearch("");
    onRequestClose();
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && filteredData.length > 0) {
      console.log("searched value", filteredData[0]);
      updateSearchValue(filteredData[0])
      handleModalClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      updateSearchValue={updateSearchValue}
      contentLabel="List of Data"
    >
      <h2>List of Data</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
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
