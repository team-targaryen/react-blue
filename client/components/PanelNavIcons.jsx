import React from 'react';
import { Link } from 'react-router-dom';
/**
 * Routes for React Router
 */
const PanelNavIcons = () => {
  return (
    <nav id='panel-nav-icons'>
      <Link to='/app'>
        <i className='fas fa-sitemap'></i>
      </Link>
      <Link to='/templates'>
        <i className='fa fa-file-code'></i>
      </Link>
      <Link to='/subtree'>
        <i className='fab fa-sourcetree'></i>
      </Link>
    </nav>
  );
};

export default PanelNavIcons;
