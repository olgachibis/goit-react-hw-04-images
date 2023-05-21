import React, { useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import css from './Modal.module.css'; 

export const Modal = ({ closeModal, children }) => {
  const keyDown = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => keyDown(e);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyDown]);

  return createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

