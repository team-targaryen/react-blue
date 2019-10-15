import React from 'react';
import { Link } from 'react-router-dom';

const SideNavIcons = () => {
  return (
    <nav id='sidenav-icons'>
      <Link to='/'>
        <i className='fas fa-code'></i>
      </Link>
      <Link to='/file-tree'>
        <i className='fas fa-sitemap'></i>
      </Link>
    </nav>
  );
};

export default SideNavIcons;
