import React, { useState } from 'react';
import ReactModal from 'react-modal';

function TestModal() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Minimal Modal">
        <div>
          <p>Hello, this is a minimal modal!</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default TestModal;
