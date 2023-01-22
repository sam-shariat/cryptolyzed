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
import { NavLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";
import { Container, Avatar, Paper, useMediaQuery , Grid, ToggleButtonGroup, ToggleButton, AvatarGroup, Tooltip, Tabs, Tab, ButtonBase, useTheme, Link } from '@mui/material';
import ChainData from '../../components/ChainData';
import LoadingCircle from '../../components/LoadingCircle';
import chains from '../../data/chains';
import { blocktime_query, txs_query } from '../../data/overviewQueries';
import GeneralMenu from '../../components/Menu';
import { navItems } from '../../data/nav/menuData';
import { Add } from '@mui/icons-material';
import Copyright from '../../components/Copyright';
import { highestSalesNftCollections, nftCollectionHolders, nftCollectionSales, nftCollectionTraders, nftHoldersByCategory } from '../../data/nftQueries';
import { abbreviateNumber, shortenWallet } from '../../functions/numberFormat';
import SingleNumber from '../../components/SingleNumber';
import PieChartSpider from '../../components/PieChartSpider';
import BarChartA from '../../components/BarChartA';
import DrawerContent from '../../components/nav/drawer';

const drawerWidth = 240;

const buttons = [
  <ToggleButton value="1" key="1">Day</ToggleButton>,
  <ToggleButton value="7" key="7">Week</ToggleButton>,
  <ToggleButton value="30" key="30">Month</ToggleButton>,
  <ToggleButton value="180" key="180">Half Year</ToggleButton>,
  <ToggleButton value="365" key="365">A Year</ToggleButton>,
  <ToggleButton value="1095" key="1095">3 Years</ToggleButton>,
  <ToggleButton value="3650" key="3650">All</ToggleButton>,
];


const CryptoPunks = (props) => {
    const loc = useLocation();
    console.log(loc);
    const address = loc.pathname.slice(5,loc.pathname.lastIndexOf("/"));
    const shortAddress = address.substr(0, 6) + ' ... ' + address.substr(-6, 6)
    const nftName = decodeURI(loc.pathname.slice(loc.pathname.lastIndexOf("/")+1) !== 'null' ? loc.pathname.slice(loc.pathname.lastIndexOf("/")+1) : shortAddress);
    const title = nftName;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [days, setDays] = React.useState('3650');
  const [image, setImage] = React.useState(null);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [prog, setProg] = useState(25);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDaysChange = (event,newDays) => {
    setDays(newDays);
  };

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  function getTheImage(){
    const apiKey = "vyc-JCB5GlfPnS6k2uJ9XBDdIlNVFiDj"
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTMetadata`;
    const contractAddr = address;
    const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=1&limit=1`;
    console.log(fetchURL)
    fetch(fetchURL, requestOptions)
        .then(response => response.json())
        .then(response => {
            var finalimage = '';
            if(String(response.metadata.image).indexOf('https://') >= 0){
                finalimage = response.metadata.image ;
                setImage(finalimage);
                console.log(finalimage)
            } else if(String(response.metadata.image).indexOf('data:image/svg+xml;utf8') >= 0) {
                finalimage = String(response.metadata.image).replace(new RegExp('&quot;', 'g'), "'");
                setImage(`data:image/svg+xml;base64,${btoa(finalimage.slice(24))}`);
                console.log(`data:image/svg+xml;base64,${btoa(finalimage.slice(24))}`)
            } else {
                setImage(response.metadata.image);
                console.log(response.metadata.image)

            }
        })
        .catch(error => console.log('error getting image', error));
  }

  if(nftName !== 'opensea' || nftName !== 'art blocks'){
    getTheImage();
  }


  const flipside = new Flipside(
    "d0709327-3a14-45e6-99cc-e1e381800d62",
    "https://node-api.flipsidecrypto.com"
  );

const query = {
    sql: nftCollectionSales({days,address}),
    ttlMinutes: 10,
  };
const query2 = {
    sql: nftCollectionHolders({days,address}),
    ttlMinutes: 10,
  };
const query3 = {
    sql: nftCollectionTraders({days,address}),
    ttlMinutes: 10,
  };
  const query4 = {
    sql: nftCollectionHolders({days,address,order:'amount'}),
    ttlMinutes: 10,
  };
  const query5 = {
    sql: nftHoldersByCategory({address}),
    ttlMinutes: 10,
  };

  useEffect(() => {
    const getData = async () => {
        setLoading(true);
        setProg(20);
        console.log(query.sql);
        const result = await flipside.query.run(query);
        console.log('data1 is here');
        console.log(result);
        setData(result.records);
        setProg(40);
        const result2 = await flipside.query.run(query2);
        console.log('data2 is here');
        console.log(result2);
        setData2(result2.records);
        setProg(60);
        const result3 = await flipside.query.run(query3);
        console.log('data3 is here');
        console.log(result3);
        setData3(result3.records);
        setProg(80);
        const result4 = await flipside.query.run(query4);
        console.log('data4 is here');
        console.log(result4);
        setData4(result4.records);
        setProg(99);
        const result5 = await flipside.query.run(query5);
        console.log('data5 is here');
        console.log(result5);
        setData5(result5.records);
        setProg(100);
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
        <GeneralMenu query={[query.sql,query2.sql,query3.sql]} title={nftName.toUpperCase() + ' Analytics Data '} days={days} />
    </Grid>
    </Grid>
        {(isLoading === false && data !== null) && 
        <Grid container spacing={2} sx={{pt:2,pb:2}}>
        <Grid item xs={12} md={4}>
        <Paper variant="outlined" sx={{ width:'100%', height:374, p : '24px 8px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>  
            <Typography variant={"h5"} component="h4" style={{display:'flex',alignItems:'center',textTransform:'uppercase'}}>
            {nftName}
            </Typography>
            {(image !== null && nftName !== 'opensea' && nftName !== 'art blocks') && <Link pt={1} href={image.indexOf('ipfs://') >= 0 && image.indexOf('https') < 0 ? ("https://ipfs.io/ipfs/"+image.slice(7)) : decodeURI(image)} >
                <img width={'auto'} height={'250'} src={image.indexOf('ipfs://') >= 0 && image.indexOf('https') < 0 ? ("https://ipfs.io/ipfs/"+image.slice(7)) : image}  /></Link> }
        </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Sales Volume (USD)'} number={data[0].sales_amount}  noAbbreviate={Number(data[0].sales_amount)<10000}/>
            <SingleNumber title={'Number Of Buyers'} number={data[0].buyers}  noAbbreviate={Number(data[0].buyers)<10000} sx={{mt:2}}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Number Of Sold NFTs'} number={data[0].nfts}  noAbbreviate={Number(data[0].nfts)<10000}/>
            <SingleNumber title={'Number Of Sellers'} number={data[0].sellers}  noAbbreviate={Number(data[0].sellers)<10000} sx={{mt:2}}/>
        </Grid>        
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Number of Sales'} number={data[0].sales} noAbbreviate={Number(data[0].sales)<10000}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Average Sales Volume (USD)'} number={data[0].avg_sales_amount} noAbbreviate={Number(data[0].avg_sales_amount)<10000}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Median Sales Volume (USD)'} number={data[0].median_sold_amount} noAbbreviate={Number(data[0].median_sold_amount)<10000}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Maximum Sold Volume (USD)'} number={data[0].max_sold_amount} noAbbreviate={Number(data[0].max_sold_amount)<10000}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <SingleNumber title={'Minimum Sold Volume (USD)'} number={data[0].min_sold_amount} noAbbreviate={Number(data[0].min_sold_amount)<10000}/>
        </Grid>
        <Grid item xs={12} md={4}>
        <SingleNumber title={'Total Fees (USD)'} number={data[0].total_fees}  noAbbreviate={Number(data[0].total_fees)<10000}/>

        </Grid>
        </Grid>
        }  

        {(isLoading === false && data2 !== null && data3 !== null && data4 !== null ) && 
        <Grid container spacing={2} sx={{pt:1,pb:1}}>
        {(nftName !== 'opensea' && nftName !== 'art blocks') &&
        <Grid item xs={12} md={12}>
            <Paper sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={500}>
            <PieChartSpider 
            data={data5} 
            x={'category'} 
            y={'holders'} 
            yLabel
            shorten={false}
            title={"Distribution Of "+ nftName.toUpperCase() +" Among Current Holders ( Today ) "}
            des={'Distribution Of ' + nftName.toUpperCase() + ' Among Current Holders ( Today ) Devided into Six Categories'} />
            </Paper>
        </Grid>
        }
        <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>  
            <Typography variant={"h5"} component="b" style={{display:'flex',alignItems:'center',textTransform:'uppercase'}}>
            Top 10 Traders By Profit Gain
            </Typography>
            <Box display='flex' flexDirection='column' width={'100%'} pt={2}>
            {data3.map((trader) => 
            <Button target='_blank' LinkComponent={Link} href={`https://etherscan.io/address/${trader.trader}`} 
            variant="outlined" sx={{ mx:0, mb:1, width:'100%',p:2,display:'flex',justifyContent:'center'}}>
              <Box sx={{flexGrow:1}}>
              <Typography variant="p" component="h5"sx={{px:2}}>
              {xs ? shortenWallet(trader.trader,10) : (sm ? shortenWallet(trader.trader,20) : trader.trader)}
              </Typography>
              <Typography variant="b" component="b"sx={{px:2}}>
              <b>{trader.nfts} NFTs</b>
              </Typography>
              </Box>
              <Typography variant="h6" component="b" sx={{px:2}}>
                <b>{abbreviateNumber(trader.total_profit)} USD</b>
              </Typography>
            </Button>
            )}
            </Box>
        </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <PieChartSpider 
            data={data3} 
            x={'trader'} 
            y={'total_profit'} 
            title="Top 10 Traders By Profit Gain"
            des='Comparing The Top 10 Traders By Profit Gain' />
            </Paper>
            <Paper sx={{ width:'100%', mt:2, p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <BarChartA 
            data={data3} 
            x={'trader'} 
            y={'total_profit'} 
            title="Top 10 Traders By Profit Gain"
            des='Comparing The Top 10 Traders By Profit Gain' />
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>  
            <Typography variant={"h5"} component="b" style={{display:'flex',alignItems:'center',textTransform:'uppercase'}}>
            Top 10 Traders By Number Of NFTS
            </Typography>
            <Box display='flex' flexDirection='column' width={'100%'} pt={2}>
            {data2.map((holder) => 
            <Button target='_blank' LinkComponent={Link} href={`https://etherscan.io/address/${holder.holder_address}`} 
            variant="outlined" sx={{ mx:0, mb:1, width:'100%',p:2,display:'flex',justifyContent:'center'}}>
              <Box sx={{flexGrow:1}}>
              <Typography variant="p" component="h5"sx={{px:2}}>
              {xs ? shortenWallet(holder.holder_address,10) : (sm ? shortenWallet(holder.holder_address,20) : holder.holder_address)}
              </Typography>
              <Typography variant="b" component="b"sx={{px:2}}>
                <b>${abbreviateNumber(holder.amount)} USD</b>
              </Typography>
              </Box>
              <Typography variant="h6" component="h5" sx={{px:2}}>
                <b>{holder.nfts} NFTs</b>
              </Typography>
            </Button>
            )}
            </Box>
        </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <PieChartSpider 
            data={data2} 
            x={'holder_address'} 
            y={'nfts'} 
            title="Top 10 Traders By Number Of NFTS"
            des='Comparing The Top 10 Traders By Number Of NFTS' />
            </Paper>
            <Paper sx={{ width:'100%', mt:2, p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <BarChartA 
            data={data2} 
            x={'holder_address'} 
            y={'nfts'} 
            title="Top 10 Trader By Number Of NFTS"
            des='Comparing The Top 10 Traders By Number Of NFTS' />
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
        <Paper variant="outlined" sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>  
            <Typography variant={"h5"} component="b" style={{display:'flex',alignItems:'center',textTransform:'uppercase'}}>
            Top 10 Traders By Volume
            </Typography>
            <Box display='flex' flexDirection='column' width={'100%'} pt={2}>
            {data4.map((holder) => 
            <Button target='_blank' LinkComponent={Link} href={`https://etherscan.io/address/${holder.holder_address}`} 
            variant="outlined" sx={{ mx:0, mb:1, width:'100%',p:2,display:'flex',justifyContent:'center'}}>
              <Box sx={{flexGrow:1}}>
              <Typography variant="p" component="h5"sx={{px:2}}>
              {xs ? shortenWallet(holder.holder_address,10) : (sm ? shortenWallet(holder.holder_address,20) : holder.holder_address)}
              </Typography>
              <Typography variant="b" component="b"sx={{px:2}}>
              <b>{holder.nfts} NFTs</b>
              </Typography>
              </Box>
              <Typography variant="h6" component="h5" sx={{px:2}}>
                <b>${abbreviateNumber(holder.amount)} USD</b>
              </Typography>
            </Button>
            )}
            </Box>
        </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper sx={{ width:'100%', p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <PieChartSpider 
            data={data4} 
            x={'holder_address'} 
            y={'amount'} 
            title="Top 10 Traders By Sales Volume"
            des='Comparing The Top 10 Traders By Sales Volume' />
            </Paper>
            <Paper sx={{ width:'100%', mt:2, p : '16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
             height={700}>
            <BarChartA 
            data={data4} 
            x={'holder_address'} 
            y={'amount'} 
            title="Top 10 Traders By Sales Volume"
            des='Comparing The Top 10 Traders By Sales Volume' />
            </Paper>
        </Grid>
        </Grid>
        }  
        {isLoading && 
        <LoadingCircle value={prog}/>}     
      </Box>
    </Box>
    <Copyright />
    </>
  );
}


export default CryptoPunks;
