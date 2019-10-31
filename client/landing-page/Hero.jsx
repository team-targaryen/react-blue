import React from 'react';
import GitHubButton from 'react-github-btn';

const Hero = () => {
  return (
    <section id='hero'>
      <div id='hero-description'>
        <h2>React Prototyping Tool</h2>
        <div className='github-buttons'>
          <GitHubButton
            href='https://github.com/team-targaryan/react-blue'
            data-size='large'
            aria-label='Follow React Blue on GitHub'
          >
            Follow React Blue
          </GitHubButton>
          <GitHubButton
            href='https://github.com/team-targaryan/react-blue'
            data-icon='octicon-star'
            data-size='large'
            data-show-count='true'
            aria-label='Star React Blue on GitHub'
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
