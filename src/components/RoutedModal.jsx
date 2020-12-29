import { useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import Modal from './Modal';

export default function RoutedModal({ children, ...rest }) {
  const location = useLocation();
  const { state = {} } = location;
  const { backdrop } = state;

  const [isOpen, setIsOpen] = useState(!!backdrop); // a routed modal is open by default

  const history = useHistory();

  if (!backdrop) return children;

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
