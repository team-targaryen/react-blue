import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import { Link as LinkScroll, animateScroll } from 'react-scroll';
import logo from '../assets/images/logo.png';

import Hero from './Hero';
import Features from './Features';
import Action from './Action';
import Usage from './Usage';
import Team from './Team';

const LandingPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id='landing-page'>
      <AppBar>
        <Toolbar id='top-nav'>
          <div className='top-nav-left'>
            <div className='logo-frame'>
              <img className='logo' src={logo} alt='react blue logo' />
            </div>
            <h1>React Blue</h1>
            <LinkScroll to='features' smooth={true} offset={-64}>
              Features
            </LinkScroll>
            <LinkScroll to='usage' smooth={true} offset={-64}>
              Usage
            </LinkScroll>
            <LinkScroll to='team' smooth={true} offset={-64}>
              Team
            </LinkScroll>
          </div>
          <div className='top-nav-right'>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              Get Started
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to='/application'>
                <MenuItem onClick={handleClose}>Web App</MenuItem>
              </Link>
              <MenuItem onClick={handleClose}>Download Mac</MenuItem>
              <MenuItem onClick={handleClose}>Download Linux</MenuItem>
              <MenuItem onClick={handleClose}>Download Windows</MenuItem>
            </Menu>
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
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          }
        }}
      />
      <Hero />
      <Features />
      <Action />
      <Usage />
      <Team />
    </div>
  );
};

export default LandingPage;
