import React, { useState } from 'react';
import Modal from 'react-modal';

// Set the root element as the accessible element for screen readers
Modal.setAppElement('#root');

const prompt = [
  {
    key: 'Grammar',
    value: `Fix all the grammar errors in the text below. Only fix grammar errors, do not change the text style. Then explain the grammar errors in a list format.\n\n'{{your content here}}'`,
  },
  {
    key: 'Coder',
    value: `Fix all the coder errors in the text below. Only fix coder errors, do not change the text style. Then explain the coder errors in a list format.\n\n'{{your content here}}'`,
  },
  {
    key: 'Educator',
    value: `Fix all the educator errors in the text below. Only fix educator errors, do not change the text style. Then explain the educator errors in a list format.\n\n'{{your content here}}'`,
  },
  {
    key: 'Interviewer',
    value: `Fix all the interviewer errors in the text below. Only fix interviewer errors, do not change the text style. Then explain the interviewer errors in a list format.\n\n'{{your content here}}'`,
  },
];

function MyModal({ isOpen, updateSearchValue, onRequestClose }) {
  const [search, setSearch] = useState('');

  const handleModalClose = () => {
    setSearch('');
    onRequestClose();
  };

  const filteredData = prompt.filter((item) =>
    item.key.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && filteredData.length > 0) {
      console.log('searched value', filteredData[0]);
      updateSearchValue(filteredData[0].value);
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
            <li key={index}>{item.key}</li>
          ))}
        </ul>
      )}
      <button onClick={handleModalClose}>Close</button>
    </Modal>
  );
}

export default MyModal;
