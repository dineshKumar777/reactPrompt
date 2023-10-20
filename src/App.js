import React, { useRef, useState } from "react";
import MyModal from "./components/modalList";
import "./styles.css";

export default function App() {
  const textareaRef = useRef(null);

  const grammarPrompt = `Fix all the grammar errors in the text below. Only fix grammar errors, do not change the text style. Then explain the grammar errors in a list format.\n\n'{{your content here}}'`;
  const target = "{{your content here}}";

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // end modal

  const handleSlashKey = (e) => {
    if (e.key === "/") {
      e.preventDefault(); // Prevent the '/' character from appearing in the textarea
      const textarea = textareaRef.current;

      if (textarea && document.activeElement === textarea) {
        textarea.value = grammarPrompt;
        const startIndex = grammarPrompt.indexOf(target);
        const endIndex = startIndex + target.length;
        // Set the selection to "{{your content here}}"
        textarea.setSelectionRange(startIndex, endIndex);
        textarea.focus();
      }
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
      <button onClick={openModal}>Open Modal</button>
      <MyModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}
