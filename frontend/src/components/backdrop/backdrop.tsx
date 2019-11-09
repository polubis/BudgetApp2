import React from 'react';

import './backdrop.scss';

interface BackdropProps {
  open: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ open }) => {
  return open ? <div className='backdrop' /> : null;
};

export default Backdrop;
