import React from 'react';
import { Link } from 'react-router-dom';

const SideNavIcons = () => {
  return (
    <nav id='sidenav-icons'>
      <Link to='/'>templates</Link>
      <Link to='/file-tree'>file-tree</Link>
    </nav>
  );
};

export default SideNavIcons;
