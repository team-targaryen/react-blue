import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

const Action = () => {
  return (
    <section id='action'>
      <h2>Get Started Now</h2>
      <div id='tool-group'>
        <ScrollAnimation animateIn='bounceIn'>
          <Link to='/app'>
            <button className='tool-item'>
              <i className='fas fa-laptop'></i>
              <p>Web App</p>
            </button>
          </Link>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={100}>
          <a href='https://drive.google.com/uc?export=download&id=1hvBhJnynQt1tSKbOnAQ8Ppns0Tsq4QhN'>
            <button className='tool-item'>
              <i className='fab fa-apple'></i>
              <p>Download Mac</p>
            </button>
          </a>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={200}>
          <a href='https://drive.google.com/uc?export=download&id=1rLpqbDcdQqxRse04cjwbQBwTtlKNmZ9t'>
            <button className='tool-item'>
              <i className='fab fa-linux'></i>
              <p>Download Linux</p>
            </button>
          </a>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceIn' delay={300}>
          <a href='https://drive.google.com/uc?export=download&id=1_IILfbUwRvX1127z9tPL-BfDltLgJemg'>
            <button className='tool-item'>
              <i className='fab fa-windows'></i>
              <p>Download Windows</p>
            </button>
          </a>
        </ScrollAnimation>
      </div>
      <h3>Usage</h3>
      <ScrollAnimation animateIn='bounceIn' delay={400}>
        <a
          href='https://github.com/team-targaryen/react-blue#readme'
          target='_blank'
        >
          <button className='tool-item'>
            <i className='far fa-file-alt'></i>
            <p>See our README</p>
          </button>
        </a>
      </ScrollAnimation>
    </section>
  );
};

export default Action;
