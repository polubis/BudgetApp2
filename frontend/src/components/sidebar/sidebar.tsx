import React from 'react';

import { Button } from '@material-ui/core';
import LogoIcon from '@material-ui/icons/Explore';

import './sidebar.scss';

const Sidebar = () => {
  return (
    <nav id='sidebar' className='col'>
      <Button>
        <LogoIcon />
      </Button>
      <Button>
        <LogoIcon />
      </Button>
      <Button>
        <LogoIcon />
      </Button>
      <Button>
        <LogoIcon />
      </Button>
    </nav>
  );
};

export default Sidebar;
