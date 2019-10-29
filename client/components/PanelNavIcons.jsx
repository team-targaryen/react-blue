import React from 'react';
import { Link } from 'react-router-dom';

const PanelNavIcons = () => {
  
  return (
    <nav id='panel-nav-icons'>
      <Link to='/'>
        <i className='fas fa-sitemap'></i>
      </Link>
      <Link to='/templates'>
        <i className='fa fa-file-code'></i>
      </Link>
      <Link to='/subTree'>
        <i className="fas fa-search-plus"></i>
      </Link>
    </nav>
  );
};

export default PanelNavIcons;
