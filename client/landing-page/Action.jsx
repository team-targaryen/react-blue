import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Action = () => {
  return (
    <section id='action'>
      <h2>Get Started Now</h2>
      <div id='tool-group'>
        <ScrollAnimation animateIn='bounceIn'>
          <button className='tool-item'>
            <i className='fas fa-laptop'></i>
            <p>Web App</p>
          </button>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={100}>
          <button className='tool-item'>
            <i className='fab fa-apple'></i>
            <p>Download Mac</p>
          </button>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={200}>
          <button className='tool-item'>
            <i className='fab fa-linux'></i>
            <p>Download Linux</p>
          </button>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={300}>
          <button className='tool-item'>
            <i className='fab fa-windows'></i>
            <p>Download Windows</p>
          </button>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Action;
