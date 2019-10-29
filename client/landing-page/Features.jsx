import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Fade from 'react-reveal/Fade';

const Features = () => {
  return (
    <ParallaxProvider>
      <section id='features'>
        <figure className='feature-item'>
          <Parallax y={['-40px', '40px']}>
            <img src='https://picsum.photos/600' />
          </Parallax>
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
          <Parallax y={['-40px', '40px']}>
            <img src='https://picsum.photos/600' />
          </Parallax>
        </figure>
        <figure className='feature-item'>
          <Parallax y={['-40px', '40px']}>
            <img src='https://picsum.photos/600' />
          </Parallax>
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
    </ParallaxProvider>
  );
};

export default Features;
