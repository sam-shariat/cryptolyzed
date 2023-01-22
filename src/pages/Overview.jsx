import * as React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";
import { 
  Container, 
  AppBar, 
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Box, 
  Avatar, 
  Divider, 
  Drawer, 
  Paper, 
  Grid, 
  ToggleButtonGroup, 
  ToggleButton, 
  AvatarGroup, 
  Tabs, 
  Tab, 
  ButtonBase,
  IconButton
 } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Add} from '@mui/icons-material';
import ChainData from '../components/ChainData';
import LoadingCircle from '../components/LoadingCircle';
import chains from '../data/chains';
import ChainsModal from '../components/ChainsModal';
import { blocktime_query, txs_query } from '../data/overviewQueries';
import GeneralMenu from '../components/Menu';
import { navItems } from '../data/nav/menuData';
import Copyright from '../components/Copyright';
import DrawerContent from '../components/nav/drawer';

const drawerWidth = 240;
const title = "Overview";

const buttons = [
  <ToggleButton value="1" key="1">Day</ToggleButton>,
  <ToggleButton value="7" key="7">Week</ToggleButton>,
  <ToggleButton value="30" key="30">Month</ToggleButton>,
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chains-tabpanel-${index}`}
      aria-labelledby={`chains-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `chains-tab-${index}`,
    'aria-controls': `chains-tabpanel-${index}`,
  };
}

const Overview = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [selectedChains, setSelectedChains] = React.useState([0,1,3,4,5,6]);
  const [days, setDays] = React.useState('1');
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [prog, setProg] = useState(25);
  const [chainModalOpen, setChainModalOpen] = React.useState(false);
  const handleChainModalOpen = () => setChainModalOpen(true);
  const handleChainModalClose = () => setChainModalOpen(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
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


  const flipside = new Flipside(
    import.meta.env.VITE_FLIPSIDE_APIKEY,
    import.meta.env.VITE_FLIPSIDE_BASEURL
  );

const query = {
    sql: txs_query({selectedChains,days}),
    ttlMinutes: 10,
  };

  const query2 = {
    sql: blocktime_query({selectedChains,days}),
    ttlMinutes: 10,
  };

  useEffect(() => {
    const getData = async () => {
        setLoading(true)
        setProg(25);
        console.log(query.sql);
        const result = await flipside.query.run(query);
        console.log('data1 is here');
        console.log(result);
        setData(result);
        setProg(75);
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
          <ButtonBase LinkComponent={NavLink} to={"/cryptolyzed/"} sx={{flexGrow:1,py:2,px:1,width: {xs : 'auto', sm:'auto'}}}>
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
        <GeneralMenu query={[query.sql,query2.sql]} title="Blockchain Metrics Data " days={days} selectedChains={selectedChains} />
    </Grid>
    <Grid item xs={12} md={12}>
    <Paper variant="outlined" sx={{ width:'100%',display:'flex',justifyContent:'center'}}>
    <Tabs 
        value={tab} 
        onChange={handleTabChange}
        centered
        variant="scrollable"
        scrollButtons="auto">
          {selectedChains.map((chn,i)=> <Tab icon={<Avatar style={{border:'none'}} sx={{backgroundColor:'primary.dark'}} alt={chains[chn].name} src={chains[chn].logo} />} iconPosition="start" label={chains[chn].name}  {...a11yProps(i)} />)}
          {selectedChains.length !== chains.length && <Button sx={{pl:2}} startIcon={<Add />} onClick={handleChainModalOpen} ></Button>}
        </Tabs>
        </Paper>
    </Grid>
    </Grid>
        {(isLoading === false && data !== null && data2 !== null ) && selectedChains.map((chn,i) =>
        <TabPanel value={tab} index={i}>
           <ChainData 
           name={chains[chn].name} 
           logo={chains[chn].logo} 
           id={chains[chn].symbol} 
           symbol={chains[chn].symbol} 
           selectedChains={selectedChains}
          total_txs={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_total_txs')]}
          total_blocks={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_total_blocks')]}
          avg_block_time={data2.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_avg_block_time')]}
          max_block_time={data2.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_max_block_time')]}
          min_block_time={data2.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_min_block_time')]}
          tx_fees={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_tx_fees')]}
          txs_per_day={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_txs_per_day')]}
          blocks_per_day={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_blocks_per_day')]}
          avg_tps={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_avg_tps')]}
          avg_tpb={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_avg_tpb')]}
          avg_fee={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_avg_fee')]}
          users_per_day={data.records[data.records.length-1][(chains[chn].name.toLowerCase()+'_users_per_day')]} />
          </TabPanel>
            )
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


export default Overview;
