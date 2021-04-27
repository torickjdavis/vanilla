import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Modal from './Modal';

export const useInModal = () => {
  const location = useLocation();
  const { state = {} } = location;
  const { backdrop } = state;
  return !!backdrop;
};

export default function RoutedModal({ children, ...rest }) {
  const inModal = useInModal();

  const [isOpen, setIsOpen] = useState(inModal); // a routed modal is open by default

  const history = useHistory();

  if (!inModal) return children;

  const close = () => {
    setIsOpen(false);
    history.goBack();
  };

  return (
    <Modal {...rest} isOpen={isOpen} close={close}>
      {children}
    </Modal>
  );
}
