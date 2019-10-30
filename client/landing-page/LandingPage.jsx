import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

import Hero from './Hero';
import Features from './Features';
import Action from './Action';
import Team from './Team';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Index = () => {
  const classes = useStyles();

  return (
    <div id='landing-page'>
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            React Blue
          </Typography>
          <Link to='/application'>
            <Button color='inherit'>Web Application</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Particles
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
      <Team />
    </div>
  );
};

export default Index;
