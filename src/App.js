import React, { useEffect, useRef, useState } from 'react';
import MyModal from './components/modalList';
import './styles.css';

export default function App() {
  const textareaRef = useRef(null);

  const grammarPrompt = `Fix all the grammar errors in the text below. Only fix grammar errors, do not change the text style. Then explain the grammar errors in a list format.\n\n'{{your content here}}'`;
  const target = '{{your content here}}';

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // end modal

  const updateSelectionArea = (promptValue) => {
    const textarea = textareaRef.current;

    if (textarea) {
      console.log('inside selection area');
      textarea.value = promptValue;
      const startIndex = promptValue.indexOf(target);
      const endIndex = startIndex + target.length;
      // Set the selection to "{{your content here}}"
      textarea.setSelectionRange(startIndex, endIndex);
      textarea.focus();
    }
  };

  const updateSearchValue = (value) => {
    console.log('input: ', value);
    setInputValue(value);
    updateSelectionArea(value);
  };

  useEffect(() => {
    console.log('updating input value', inputValue);
    const textarea = textareaRef.current;
    textarea.value = inputValue;
  }, [inputValue]);

  const handleSlashKey = (e) => {
    if (e.key === '/') {
      e.preventDefault();
      openModal();
      <MyModal
        isOpen={modalIsOpen}
        updateSearchValue={updateSearchValue}
        onRequestClose={closeModal}
      />;
    }
  };

  return (
    <div className="App">
      <label>
        Enter your prompt:
        <br />
        <br />
        <textarea
          id="promptContent"
          rows={8}
          cols={80}
          placeholder="Press / to insert prompt template"
          ref={textareaRef}
          onKeyDown={handleSlashKey}
        />
      </label>
      <br />
      <MyModal
        isOpen={modalIsOpen}
        updateSearchValue={updateSearchValue}
        onRequestClose={closeModal}
      />
    </div>
  );
}
