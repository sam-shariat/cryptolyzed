import * as React from 'react';
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";
import { Container, Avatar, Paper, useMediaQuery , Grid, ToggleButtonGroup, ToggleButton, AvatarGroup, Tooltip, Tabs, Tab, ButtonBase, useTheme, Link } from '@mui/material';
import ChainData from '../components/ChainData';
import LoadingCircle from '../components/LoadingCircle';
import chains from '../data/chains';
import { blocktime_query, txs_query } from '../data/overviewQueries';
import GeneralMenu from '../components/Menu';
import { navItems } from '../data/nav/menuData';
import { Add } from '@mui/icons-material';
import Copyright from '../components/Copyright';
import { highestSalesNftCollections } from '../data/nftQueries';
import { abbreviateNumber } from '../functions/numberFormat';

const drawerWidth = 240;
const title = "About";

const About = (props) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
   
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ my: 2 }} textTransform='uppercase'>
      {"Cryptolyzed"}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name.replace(/ /g, '-')} disablePadding>
            <NavLink to={item.url} className="navlink">
            <ListItemButton sx={{ px: 3 }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Cryptolyzed | {title} | Blockchain Analytics</title>    
      </Helmet>
      <AppBar component="nav">
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, mx:1 }}>
            <MenuIcon />
          </IconButton>
          <ButtonBase LinkComponent={NavLink} to={"/"} sx={{flexGrow:1,py:2,px:1,width: {xs : 'auto', sm:'auto'}}}>
          <Typography
            variant="h5"
            component="h5"
            align='left'
            sx={{ p:0, display: { md: 'flex' }, flexGrow:1,fontWeight:'bold', textTransform:'uppercase'}}
          >
            {"Cryptolyzed"}
          </Typography>
          </ButtonBase>
          <Container sx={{display: { sm: 'flex',xs: 'none' } }}>
          {navItems.map((nav) => 
          <Button 
          onClick={handleDrawerToggle}
          sx={{ my: 2, color: 'white', display: 'block' }} LinkComponent={NavLink} to={nav.url}>
            {nav.name}
          </Button>
          )}
          </Container>
          <Tooltip title="Changing Chain is Available on Overview and Charts Pages">
          <Button variant="outlined" sx={{ m:1 , p : '8px 12px',display:'flex',alignItems:'center',border:'1px solid rgb(255 255 255 / 12%)'}}>
            <AvatarGroup max={3}>
              {/* {selectedChains.map((chn) => */}
              <Avatar 
              style={{border:'1px solid #121212'}} 
              sx={{backgroundColor:'primary.dark',width: 40, height: 38}} 
              alt={chains[0].name} src={chains[0].logo}/>
              {/* )} */}
            </AvatarGroup>
          </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={window !== undefined ? () => window.document.body : undefined}
          variant="temporary"
          open={mobileOpen}
          anchor="left"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ width:'100%' , p: 3 }}>
        <Toolbar />
        <Container maxWidth="md">
      <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
      <Box sx={{ py: 4}}>
        <Typography sx={{textAlign:'center'}} variant="h3" component="h1" align="center">
          <b>Crypto Analytics</b>
        </Typography>
        <Typography sx={{py:1,textAlign:'center'}} variant="body1" align="center">
          <b>Blockchain Analytics, Metrics, Charts and More</b>
        </Typography>
      </Box>
        
        <Typography sx={{py:1,textAlign:'center'}} variant="h6" align="center">
          This is Sam, Cryptolyzed has been developed in React.js and uses Flipsidecrypto ShroomDK for getting realtime blockchain data and It's just getting started !
          <br/>
          This is an Alpha version. New Features, Dashboards And Analytics will be added Every Week.
        </Typography>
        <Typography sx={{py:1,textAlign:'center'}} variant="h5" align="center">

        Stay Tuned</Typography>
        <Typography sx={{py:2,textAlign:'center'}} variant="body1" align="center">
          Drop me a message if you have any questions!
        </Typography>
      </Grid>
        <Grid item md={6} xs={12}>
        
          <Button LinkComponent={Link} href="https://twitter.com/samywalters" target={'_blank'} variant='outlined' sx={{height:120,width:'100%'}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>Twitter</b>
          </Typography>
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Button LinkComponent={Link} href="mailto:moslem.shariat@gmail.com" target={'_blank'} variant='outlined' sx={{height:120}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>Email</b>
          </Typography>
          </Button>
        
        </Grid>
        </Grid>
      </Container>
        </Box>
     </Box>
     <Copyright />
    </>
  );
}


export default About;
