import * as React from 'react';
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
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";
import { Checkbox, Avatar, Paper, Modal, Grid, ToggleButtonGroup, ToggleButton, AvatarGroup, Tooltip, Container, ButtonBase } from '@mui/material';
import ChainData from '../components/ChainData';
import LoadingCircle from '../components/LoadingCircle';
import ChainCharts from '../components/ChainCharts';
import chains from '../data/chains';
import {txs_query,blocktime_query} from '../data/chartQueries';
import ChainsModal from '../components/ChainsModal';
import GeneralMenu from '../components/Menu';
import { navItems } from '../data/nav/menuData';
import Copyright from '../components/Copyright';
import DrawerContent from '../components/nav/drawer';

const drawerWidth = 240;
const title = "Charts"; 
const buttons = [
  <ToggleButton value="7" key="7">Week</ToggleButton>,
  <ToggleButton value="31" key="31">Month</ToggleButton>,
  <ToggleButton value="182" key="182">6 Months</ToggleButton>,
  <ToggleButton value="365" key="365">Year</ToggleButton>,
];

const Charts = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedChains, setSelectedChains] = React.useState([0,1,3,4,5,6]);
  const [days, setDays] = React.useState('7');
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [prog, setProg] = useState(25)
  const [chainModalOpen, setChainModalOpen] = React.useState(false);
  const handleChainModalOpen = () => setChainModalOpen(true);
  const handleChainModalClose = () => setChainModalOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDaysChange = (event,newDays) => {
    setDays(newDays);
  };

  function chainSelected(index,all='0') {
    console.log(index);
    if(all === '0'){
      if (selectedChains.indexOf(index) >= 0) {
        console.log(selectedChains.filter(e => e !== index));
        setSelectedChains(selectedChains.filter(e => e !== index));
        console.log('its already here')
      } else {
        setSelectedChains(selectedChains => [...selectedChains,index].sort());
        console.log('adding it')
      }
    } else {
      if(all === '1'){
        setSelectedChains([0,1,3,4,5,6]);
      } else {
        setSelectedChains([0]);
      }
    }
  }

  const flipside = new Flipside(
    import.meta.env.VITE_FLIPSIDE_APIKEY,
    import.meta.env.VITE_FLIPSIDE_BASEURL
  );

const query = {
    sql: txs_query({ selectedChains, days }),
    ttlMinutes: 10,
  };

  const query2 = {
    sql: blocktime_query({selectedChains, days}),
    ttlMinutes: 10,
  };

  useEffect(() => {
    const getData = async () => {
        setLoading(true)
        setProg(25);
        console.log(query);
        console.log('query');
        const result = await flipside.query.run(query);
        console.log('data1 is here');
        console.log(result);
        setData(result);
        setProg(75);
        console.log(query2);
        console.log('query2');
        const result2 = await flipside.query.run(query2);
        console.log('data2 is here');
        console.log(result2);
        setProg(100);
        setData2(result2);
        setLoading(false);
    };
  
    getData(); // run it, run it
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, [days,selectedChains]);
  
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Cryptolyzed | {title} | BlockChain Analytics</title>    
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
          <ButtonBase LinkComponent={NavLink} to={"/cryptolyzed/"} sx={{flexGrow:1,py:2,px:3,width: {xs : 'auto', sm:'auto'}}}>
          <Typography
            variant="h5"
            component="h5"
            align='left'
            sx={{ p:0, display: { md: 'flex' }, flexGrow:1, width: {xs : 'auto', sm:'auto'},fontWeight:'bold', textTransform:'uppercase'}}
          >
            {"Cryptolyzed"}
          </Typography>
          </ButtonBase>
          <Container sx={{display: { sm: 'flex',xs: 'none' }, flexGrow:1 }}>
          {navItems.map((nav) => 
          <Button sx={{ my: 2, color: 'white', display: 'block' }} LinkComponent={NavLink} to={nav.url}>
            {nav.name}
          </Button>
          )}
          </Container>
          <Button onClick={handleChainModalOpen} variant="outlined" sx={{ m:1 , p : '8px 12px',display:'flex',alignItems:'center',border:'1px solid rgb(255 255 255 / 12%)'}}>
            <AvatarGroup max={3}>
              {selectedChains.map((chn) =>
              <Avatar 
              style={{border:'1px solid #121212'}} 
              sx={{backgroundColor:'primary.dark',width: 40, height: 38}} 
              alt={chains[chn].name} src={chains[chn].logo}/>
              )}
            </AvatarGroup>
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={window !== undefined ? () => window().document.body : undefined}
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
          <DrawerContent handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ width:'100%' , p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
        <Grid item xs={12} >
    <Box sx={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
          <ToggleButtonGroup 
              color="primary"
              value={days}
              exclusive
              fullWidth
              onChange={handleDaysChange} 
              size="large">
                {buttons}
              </ToggleButtonGroup>
          </Box>
    </Grid>
      <Grid item xs={12} md={12}>
        <GeneralMenu query={[query.sql,query2.sql]} title="Blockchain Metrics Charts "  days={days} selectedChains={selectedChains} />
      </Grid>
    </Grid>
        {(isLoading === false && data !== null && data2 !== null ) && //chains.map((chn) =>
           <ChainCharts 
            selectedChains={selectedChains}
            txs_data={data.records}
            blocks_data={data2.records}/>
            //)
        }  
        {isLoading && 
        <LoadingCircle value={prog}/>}     
        <ChainsModal 
        open={chainModalOpen} 
        onClose={handleChainModalClose} 
        onClick={chainSelected} 
        selectedChains={selectedChains}
        />
        
      </Box>
    </Box>
    <Copyright />
    </>
  );
}


export default Charts;
