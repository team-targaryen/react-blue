import React from 'react';
import Button from '@material-ui/core/Button';

const Action = () => {
  return (
    <section id='action'>
      <h2>Get Started Now</h2>
      <div id='tool-group'>
        <button className='tool-item'>
          <i className='fas fa-laptop'></i>
          <p>Web App</p>
        </button>
        <button className='tool-item'>
          <i className='fab fa-apple'></i>
          <p>Download Mac</p>
        </button>
        <button className='tool-item'>
          <i className='fab fa-linux'></i>
          <p>Download Linux</p>
        </button>
        <button className='tool-item'>
          <i className='fab fa-windows'></i>
          <p>Download Windows</p>
        </button>
      </div>
    </section>
  );
};

export default Action;
