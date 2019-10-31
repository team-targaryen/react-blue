import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Features = () => {
  return (
    <section id='features'>
      <h2>Streamline Your Development Process</h2>
      <figure className='feature-item'>
        <img src='../images/feature-1.gif' alt='feature 1' />
        <ScrollAnimation animateIn='fadeInRight'>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </ScrollAnimation>
      </figure>
      <figure className='feature-item'>
        <ScrollAnimation animateIn='fadeInLeft'>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </ScrollAnimation>
        <img src='../images/feature-2.gif' alt='feature 2' />
      </figure>
      <figure className='feature-item'>
        <img src='https://picsum.photos/600' />
        <ScrollAnimation animateIn='fadeInRight'>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </ScrollAnimation>
      </figure>
    </section>
  );
};

export default Features;
