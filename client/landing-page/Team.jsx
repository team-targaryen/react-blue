import React, { useState } from 'react';
import darren from '../assets/images/darren.jpg';
import kendall from '../assets/images/kendall.jpg';
import randy from '../assets/images/randy.jpg';
import krystal from '../assets/images/krystal.jpg';

const Team = () => {
  const [isCreatorProfiles] = useState([
    {
      name: 'Darren Zhu',
      github: 'https://github.com/Joodongri',
      linkedin: 'https://www.linkedin.com/in/darrenDzhu',
      src: darren
    },
    {
      name: 'Kendall Lu',
      github: 'https://github.com/kendall-lu',
      linkedin: 'https://www.linkedin.com/in/kendall-lu',
      src: kendall
    },
    {
      name: 'Randy Reyes',
      github: 'https://github.com/rqreyes',
      linkedin: 'https://www.linkedin.com/in/rqreyes',
      src: randy
    },
    {
      name: 'Krystal Chen',
      github: 'https://github.com/kcrystalchen',
      linkedin: 'https://www.linkedin.com/in/kcrystalchen',
      src: krystal
    }
  ]);
  const creatorProfileArray = isCreatorProfiles.map(profile => {
    return (
      <Profiles
        key={`profile${profile.name}`}
        src={profile.src}
        name={profile.name}
        linkedin={profile.linkedin}
        github={profile.github}
      />
    );
  });
  return (
    <section id='team'>
      <h2>Meet the Team</h2>
      <div id='profile-group'>{creatorProfileArray}</div>
    </section>
  );
};

const Profiles = ({ src, name, linkedin, github }) => {
  return (
    <React.Fragment>
      <div className='profile'>
        <figure>
          <div className='profile-frame'>
            <img className='profile-photo' src={src} />
          </div>
          <figcaption>{name}</figcaption>
        </figure>
        <div className='profile-links'>
          <a href={linkedin} target='_blank'>
            <i className='fab fa-linkedin'></i>
          </a>
          <a href={github} target='_blank'>
            <i className='fab fa-github'></i>
          </a>
        </div>
      </div>
      <i class='fas fa-exchange-alt'></i>
    </React.Fragment>
  );
};

export default Team;
