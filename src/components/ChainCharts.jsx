import { Avatar, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import chains from "../data/chains";
import * as React from 'react';
import LineChart from "./LineChart";
import SingleNumber from "./SingleNumber";
import { useState } from "react";
import { AccountBalanceWallet, BlurOn, Paid, Window } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`charts-tabpanel-${index}`}
      aria-labelledby={`charts-tab-${index}`}
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
    id: `charts-tab-${index}`,
    'aria-controls': `charts-tabpanel-${index}`,
  };
}


function ChainCharts({txs_data,selectedChains,blocks_data}){
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
        const txs_per_day_datasets = [];
        const block_per_day_datasets = [];
        const avg_blocktime_datasets = [];
        const min_blocktime_datasets = [];
        const max_blocktime_datasets = [];
        const avg_tpb_datasets = [];
        const avg_tps_datasets = [];
        const tx_fees_datasets = [];
        const users_per_day_datasets = [];

        for( let j = 0; j < chains.length; j++ ){
            for (let i = 0; i < txs_data.length; i++) {
                if(selectedChains.indexOf(j) < 0) {
                    continue;
                }
                const txs_per_day = {};
                const block_per_day = {};
                const avg_blocktime = {};
                const min_blocktime = {};
                const max_blocktime = {};
                const avg_tpb = {};
                const avg_tps = {};
                const tx_fees = {};
                const users_per_day = {};

                txs_per_day['chain'] = chains[j].name;
                block_per_day['chain'] = chains[j].name;
                avg_tpb['chain'] = chains[j].name;
                avg_tps['chain'] = chains[j].name;
                tx_fees['chain'] = chains[j].name;
                users_per_day['chain'] = chains[j].name;
                avg_blocktime['chain'] = chains[j].name;
                min_blocktime['chain'] = chains[j].name;
                max_blocktime['chain'] = chains[j].name;


                txs_per_day['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                block_per_day['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                avg_tpb['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                avg_tps['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                tx_fees['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                users_per_day['date'] = new Date(txs_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                avg_blocktime['date'] = new Date(blocks_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                min_blocktime['date'] = new Date(blocks_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
                max_blocktime['date'] = new Date(blocks_data[i].date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' });


                txs_per_day['txs_per_day'] = txs_data[i][chains[j].name.toLowerCase()+'_txs_per_day'] ;
                block_per_day['blocks_per_day'] = txs_data[i][chains[j].name.toLowerCase()+'_blocks_per_day'] ;
                avg_tpb['avg_tpb'] = txs_data[i][chains[j].name.toLowerCase()+'_avg_tpb'] ;
                avg_tps['avg_tps'] = txs_data[i][chains[j].name.toLowerCase()+'_avg_tps'] ;
                tx_fees['tx_fees'] = txs_data[i][chains[j].name.toLowerCase()+'_tx_fees'] ;
                users_per_day['users_per_day'] = txs_data[i][chains[j].name.toLowerCase()+'_users_per_day'] ;
                avg_blocktime['avg_block_time'] = blocks_data[i][chains[j].name.toLowerCase()+'_avg_block_time'] ;
                min_blocktime['min_block_time'] = blocks_data[i][chains[j].name.toLowerCase()+'_min_block_time'] ;
                max_blocktime['max_block_time'] = blocks_data[i][chains[j].name.toLowerCase()+'_max_block_time'] ;


                txs_per_day_datasets.push(txs_per_day) 
                block_per_day_datasets.push(block_per_day) 
                avg_tpb_datasets.push(avg_tpb) 
                avg_tps_datasets.push(avg_tps) 
                tx_fees_datasets.push(tx_fees) 
                users_per_day_datasets.push(users_per_day) 
                avg_blocktime_datasets.push(avg_blocktime) 
                min_blocktime_datasets.push(min_blocktime) 
                max_blocktime_datasets.push(max_blocktime) 
            }
        }
        
        console.log(txs_per_day_datasets);
    
    return ( 
      
      <Grid container spacing={2} sx={{pt:3,pb:3}}>
        <Grid item xs={12} md={12}>
      <Paper variant="outlined" sx={{ width:'100%',display:'flex',justifyContent:'center'}}>
        <Tabs 
        value={tab} 
        onChange={handleTabChange}
        centered
        variant="scrollable"
        scrollButtons="auto">
          <Tab icon={<BlurOn />} iconPosition="start" label={"Transactions"}  {...a11yProps(0)} />
          <Tab icon={<Window />} iconPosition="start" label={"Blocks"}  {...a11yProps(1)} />
          <Tab icon={<Paid />} iconPosition="start" label={"Fees"}  {...a11yProps(2)} />
          <Tab icon={<AccountBalanceWallet />} iconPosition="start" label={"Wallets"}  {...a11yProps(3)} />
        </Tabs>
      </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
        <TabPanel index={0} value={tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={txs_per_day_datasets} title={"Transactions Per Day"} x="date" y="txs_per_day"/>
            </Grid>     
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={avg_tpb_datasets} title={"Transactions Per Block"} x="date" y="avg_tpb"/>
            </Grid>
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={avg_tps_datasets} title={"Transactions Per Second"} x="date" y="avg_tps"/>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={block_per_day_datasets} title={"Blocks Per Day"} x="date" y="blocks_per_day"/>
            </Grid>  
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={blocks_data} data={avg_blocktime_datasets} title={"Average Block Time"} x="date" y="avg_block_time"/>
            </Grid>  
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={blocks_data} data={min_blocktime_datasets} title={"Minimum Block Time"} x="date" y="min_block_time"/>
            </Grid>  
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={blocks_data} data={max_blocktime_datasets} title={"Maximum Block Time"} x="date" y="max_block_time"/>
            </Grid>     
          </Grid>
        </TabPanel>
        <TabPanel index={2} value={tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={tx_fees_datasets} title={"Fees Per Day"} x="date" y="tx_fees"/>
            </Grid>     
          </Grid>
        </TabPanel>
        <TabPanel index={3} value={tab}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <LineChart selectedChains={selectedChains} orgdata={txs_data} data={users_per_day_datasets} title={"Active Unique Wallets Per Day"} x="date" y="users_per_day"/>
            </Grid>     
          </Grid>
        </TabPanel>
        </Grid>   
        
      </Grid>
    )
  }

  export default ChainCharts;