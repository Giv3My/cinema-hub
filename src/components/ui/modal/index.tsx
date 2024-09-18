import React from 'react';
import ReactDOM from 'react-dom';
import { useClickAway } from 'react-use';

import { RiCloseFill } from 'react-icons/ri';
import styles from './modal.module.scss';

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  isOpen,
  closeModal,
}) => {
  const modalRef = React.useRef<HTMLElement | null>(document.getElementById('modal'));
  const modalWindowRef = React.useRef<HTMLDivElement | null>(null);

  useClickAway(modalWindowRef, () => {
    closeModal();
  });

  if (!modalRef.current || !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div ref={modalWindowRef} className={styles.window}>
        <button onClick={closeModal}>
          <RiCloseFill />
        </button>
        {children}
      </div>
    </div>,
    modalRef.current
  );
};
