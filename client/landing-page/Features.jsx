import React from 'react';
import Fade from 'react-reveal/Fade';

const Features = () => {
  return (
    <section id='features'>
      <h2>Streamline Your Development Process</h2>
      <figure className='feature-item'>
        <iframe
          width='600'
          height='315'
          src='https://media.giphy.com/media/JpXEK9GC6Z9vk8lfDi/giphy.gif'
          frameBorder='0'
          allowFullScreen
        ></iframe>
        <Fade right>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </Fade>
      </figure>
      <figure className='feature-item'>
        <Fade left>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </Fade>
        <iframe
          width='600'
          height='315'
          src='https://media.giphy.com/media/Y3vwiphEodr52wcMrB/giphy.gif'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </figure>
      <figure className='feature-item'>
        <img src='https://picsum.photos/600' />
        <Fade right>
          <figcaption className='feature-description'>
            <h3>Feature</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </figcaption>
        </Fade>
      </figure>
    </section>
  );
};

export default Features;
