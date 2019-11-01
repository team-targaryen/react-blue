import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Features = () => {
  return (
    <section id='features'>
      <h2>Streamline Your Development Process</h2>
      <figure className='feature-item'>
        <div className='image-frame'>
          <img src='../images/feature-1.gif' alt='feature 1' />
        </div>
        <ScrollAnimation animateIn='fadeInRight'>
          <figcaption className='feature-description'>
            <h3>Engineer-first Approach</h3>
            <p>
              We envision the ability for engineers to quickly create their
              component file structure coupled with a friendly UI/UX. This tool
              provides an export feature that sets up a pre-configured
              development environment for front-end and full-stack React
              applications.
            </p>
          </figcaption>
        </ScrollAnimation>
      </figure>
      <figure className='feature-item'>
        <ScrollAnimation animateIn='fadeInLeft'>
          <figcaption className='feature-description'>
            <h3>Shortcuts and Views</h3>
            <p>
              Keyboard shortcuts right at your fingertips to perform undo
              (ctrl+z) and redo (ctrl+shift+z) actions and toggle between
              horizontal and vertical views of the component tree.
            </p>
          </figcaption>
        </ScrollAnimation>
        <div className='image-frame'>
          <img src='../images/feature-2.gif' alt='feature 2' />
        </div>
      </figure>
    </section>
  );
};

export default Features;
