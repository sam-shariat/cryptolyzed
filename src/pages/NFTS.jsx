import * as React from 'react';
import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";
import { Container, Avatar, Paper, useMediaQuery , Grid, ToggleButtonGroup, ToggleButton, AvatarGroup, Tooltip, Tabs, Tab, ButtonBase, useTheme } from '@mui/material';
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
import DrawerContent from '../components/nav/drawer';

const drawerWidth = 240;
const title = "NFTs | Highest Sales Collections";

const buttons = [
  <ToggleButton value="1" key="1">Day</ToggleButton>,
  <ToggleButton value="7" key="7">Week</ToggleButton>,
  <ToggleButton value="30" key="30">Month</ToggleButton>,
  <ToggleButton value="180" key="180">Half Year</ToggleButton>,
  <ToggleButton value="365" key="365">A Year</ToggleButton>,
  <ToggleButton value="1095" key="1095">3 Years</ToggleButton>,
  <ToggleButton value="3650" key="3650">All</ToggleButton>,
];


const NFTS = (props) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [days, setDays] = React.useState('3650');
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [prog, setProg] = useState(25);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDaysChange = (event,newDays) => {
    setDays(newDays);
  };

  const flipside = new Flipside(
    import.meta.env.VITE_FLIPSIDE_APIKEY,
    import.meta.env.VITE_FLIPSIDE_BASEURL
  );

const query = {
    sql: highestSalesNftCollections({days}),
    ttlMinutes: 10,
  };


  useEffect(() => {
    const getData = async () => {
        setLoading(true)
        setProg(50);
        console.log(query.sql);
        const result = await flipside.query.run(query);
        console.log('data1 is here');
        console.log(result);
        setData(result.records);
        setProg(100);
        //const result2 = await flipside.query.run(query2);
        //console.log('data2 is here');
        //console.log(result2);
        //setProg(100);
        //setData2(result2);
        setLoading(false);
    };
  
    getData(); // run it, run it
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, [days]);
  
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
          <Tooltip title="NFT analytics is available only on Ethereum (For Now!)">
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
          <DrawerContent handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ width:'100%' , p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>
          <ToggleButtonGroup 
              color="primary"
              value={days}
              exclusive
              fullWidth
              onChange={handleDaysChange} 
              size={xs ? "small" : (sm ? "small" : (md ? "medium" : (lg ? "large" : "large")))}>
                {buttons}
            </ToggleButtonGroup>
          
    </Grid>
        <Grid item xs={12} md={12}>
        <GeneralMenu query={[query.sql]} title="Highest Sales Volume NFT Collections " days={days} />
    </Grid>
    </Grid>
        {(isLoading === false && data !== null ) && data.map((collection) =>
        <Button LinkComponent={NavLink} to={'/nft/'+collection.nft_address+'/'+collection.project_name} 
        variant="outlined" 
        sx={{ mx:{md:0,lg:40}, my:2,p:2,display:'flex',justifyContent:'center'}}>
          <Box sx={{flexGrow:1}}>
          <Typography variant="h5" component="h5"sx={{px:2}}>
            <b>{(collection.project_name !== null ? collection.project_name : (collection.nft_address.substr(0, 6) + ' ... ' + collection.nft_address.substr(-6, 6)))}</b>
          </Typography>
          <Typography variant="h5" component="h5"sx={{px:2}}>
            <b>${abbreviateNumber(collection.amount)} USD</b>
          </Typography>
          </Box>
          <Typography variant="h5" component="h5" sx={{px:2}}>
            <b>{abbreviateNumber(collection.tx_count)} Sales</b>
          </Typography>
        </Button>
        )
        }  
        {isLoading && 
        <LoadingCircle value={prog}/>}     
      </Box>
    </Box>
    <Copyright />
    </>
  );
}


export default NFTS;
