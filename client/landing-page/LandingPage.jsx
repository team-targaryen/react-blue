import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

import Hero from './Hero';
import Features from './Features';
import Action from './Action';
import Team from './Team';

const Index = () => {
  return (
    <div id='landing-page'>
      <AppBar>
        <Toolbar id='top-nav'>
          <h1>React Blue</h1>
          <div className='app-buttons'>
            <Link to='/application'>
              <Button>Web App</Button>
            </Link>
            <Button>Desktop App</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Particles
        className='landing-bg'
        params={{
          particles: {
            number: {
              value: 140
            },
            size: {
              value: 4
            }
          }
        }}
      />
      <Hero />
      <Features />
      <Action />
      <Team />
    </div>
  );
};

export default Index;
