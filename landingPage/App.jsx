import React, { useState } from 'react';
import GitHubButton from 'react-github-btn'
const App = () => {
  const [isCreatorProfiles] = useState(
    [
      { name: "Darren Zhu", githubHandle: 'Joodongri', github: "https://github.com/Joodongri", dataVanity: 'darrenDzhu', linked: 'https://www.linkedin.com/in/darrenDzhu?trk=profile-badge' },
      { name: "Kendall Lu", githubHandle: 'kendall-lu', github: "https://github.com/kendall-lu", dataVanity: 'kendall-lu', linked: 'https://www.linkedin.com/in/kendall-lu?trk=profile-badge' },
      { name: "Randy Reyes", githubHandle: 'rqreyes', github: "https://github.com/rqreyes", dataVanity: 'rqreyes', linked: 'https://www.linkedin.com/in/rqreyes?trk=profile-badge' },
      { name: "Krystal Chen", githubHandle: 'kcrystalchen', github: "https://github.com/kcrystalchen", dataVanity: 'kcrystalchen', linked: 'https://www.linkedin.com/in/kcrystalchen?trk=profile-badge' }
    ]
  );
  const creatorProfileArray = isCreatorProfiles.map(profile => {
    return (<Profiles
      key={`profile${profile.name}`}
      githubHandle={profile.githubHandle}
      name={profile.name}
      github={profile.github}
      dataVanity={profile.dataVanity}
      linked={profile.linked}
    />);
  })
  return (
    <React.Fragment>
      <h1>React-Blue</h1>
      <GitHubButtons />
      <Gifs />
      {creatorProfileArray}
    </React.Fragment>
  )
}
const GitHubButtons = () => {
  return (
    <div className='github-buttons'>
      <GitHubButton href="https://github.com/team-targaryan/react-blue" data-size="large" aria-label="Follow @React Blue on GitHub">Follow @React Blue</GitHubButton>
      <GitHubButton href="https://github.com/team-targaryan/react-blue" data-size="large" data-show-count="true" aria-label="Star @React Blue on GitHub">Star</GitHubButton>
      <button href="#">Go To Our Web Application</button>
    </div>
  )
}

const Gifs = () => {
  return (
    <div className='iFrames'>
      <iframe width="560" height="315" src='https://media.giphy.com/media/JpXEK9GC6Z9vk8lfDi/giphy.gif' frameborder="0" allowfullscreen></iframe>
      <iframe width="560" height="315" src='https://media.giphy.com/media/Y3vwiphEodr52wcMrB/giphy.gif' frameborder="0" allowfullscreen></iframe>
      <p>Insert Text Here</p>
    </div>
  );
}
const Profiles = ({ name, github, linked, dataVanity, githubHandle }) => {
  return (
    <div className='profile-info'>
      <div className="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity={dataVanity}><a className="LI-simple-link" href={linked} >{name}</a></div>
      <GitHubButton href={github} data-size="large" >Follow @{githubHandle}</GitHubButton>
    </div>
  )
}


export default App;