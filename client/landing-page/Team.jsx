import React, { useState } from 'react';
import GitHubButton from 'react-github-btn';
import darren from '../assets/images/darren.jpeg';
import kendall from '../assets/images/kendall.jpeg';
import randy from '../assets/images/randy.jpeg';
import krystal from '../assets/images/krystal.jpeg';
import github from '../assets/images/githubLogo.png';
const Team = () => {
  const [isCreatorProfiles] = useState([
    {
      name: 'Darren Zhu',
      githubHandle: 'Joodongri',
      github: 'https://github.com/Joodongri',
      linked: 'https://www.linkedin.com/in/darrenDzhu',
      src: darren
    },
    {
      name: 'Kendall Lu',
      githubHandle: 'kendall-lu',
      github: 'https://github.com/kendall-lu',
      linked: 'https://www.linkedin.com/in/kendall-lu',
      src: kendall
    },
    {
      name: 'Randy Reyes',
      githubHandle: 'rqreyes',
      github: 'https://github.com/rqreyes',
      linked: 'https://www.linkedin.com/in/rqreyes',
      src: randy
    },
    {
      name: 'Krystal Chen',
      githubHandle: 'kcrystalchen',
      github: 'https://github.com/kcrystalchen',
      linked: 'https://www.linkedin.com/in/kcrystalchen',
      src: krystal
    }
  ]);
  const creatorProfileArray = isCreatorProfiles.map(profile => {
    return (
      <Profiles
        key={`profile${profile.name}`}
        githubHandle={profile.githubHandle}
        name={profile.name}
        github={profile.github}
        src={profile.src}
        linked={profile.linked}
      />
    );
  });
  return (
    <section className='team'>
      <h1>React-Blue</h1>
      <GitHubButtons />
      <Gifs />
      <div className='profile-info'>
        {creatorProfileArray}
      </div>
    </section>
  );
};
const GitHubButtons = () => {
  return (
    <div className='github-buttons'>
      <img id='github-logo' src={github}></img>
      <GitHubButton
        href='https://github.com/team-targaryan/react-blue'
        data-size='large'
        aria-label='Follow @React Blue on GitHub'
      >
        Follow @React Blue
      </GitHubButton>
      <a class="github-button" href="https://github.com/team-targaryan/react-blue" data-icon="octicon-star" aria-label="Star react-blue on GitHub">Star</a>
    </div>
  );
};

const Gifs = () => {
  return (
    <div className='iFrames'>
      <iframe
        width='560'
        height='315'
        src='https://media.giphy.com/media/JpXEK9GC6Z9vk8lfDi/giphy.gif'
        frameBorder='0'
        allowfullscreen
      ></iframe>
      <iframe
        width='560'
        height='315'
        src='https://media.giphy.com/media/Y3vwiphEodr52wcMrB/giphy.gif'
        frameBorder='0'
        allowfullscreen
      ></iframe>
      <p>Insert Text Here</p>
    </div>
  );
};
const Profiles = ({ name, github, linked, githubHandle, src }) => {
  return (
    <section>
      <div className='individual-profile'>
        <img id='profile-picture' src={src} />
        <button id='linkedin' href={linked}><i className="fab fa-linkedin"></i>@{name}</button>
        <GitHubButton id='github' href={github} data-size='large'>
          Follow @{githubHandle}
        </GitHubButton>
      </div>
    </section>
  );
};

export default Team;
