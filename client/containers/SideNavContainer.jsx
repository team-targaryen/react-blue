import React from 'react';
import { Link } from 'react-router-dom';

const SideNavContainer = () => {
  return (
    <nav className='side-nav'>
      <Link to='/component-detail'>
        <p>component-detail</p>
      </Link>
      <Link to='/children-list'>
        <p>children-list</p>
      </Link>
      <Link to='/templates'>
        <p>templates</p>
      </Link>
      <Link to='/file-tree'>
        <p>file-tree</p>
      </Link>
    </nav>
  );
};

export default SideNavContainer;
