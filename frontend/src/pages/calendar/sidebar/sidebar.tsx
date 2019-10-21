import React from 'react';

import { Button } from '@material-ui/core';
import LogoIcon from '@material-ui/icons/Explore';

import './sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <aside className='col' id='sidebar'>
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
    </aside>
  );
};

export default Sidebar;
