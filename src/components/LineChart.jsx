import {  Avatar, Box, Chip, Grid, Paper, Typography } from '@mui/material';
import { Chart, LineAdvance, Legend} from 'bizcharts';
import { useState,useEffect } from 'react';
import React from 'react';
import chains from '../data/chains';
import SingleNumber from './SingleNumber';

const LineChart =({data,title,x,y,orgdata,selectedChains})=> {
  const [ydata, setYdata] = React.useState([]);
  const badges = selectedChains.map((chn) => 
    {
      let oldnumber = orgdata[0][chains[chn].name.toLowerCase()+"_"+y];
      let newnumber = orgdata[orgdata.length-1][chains[chn].name.toLowerCase()+"_"+y];
      let color = "";
      let positive = false;
      let increase = newnumber - oldnumber ;
      let percentage = Math.round((( increase / oldnumber ) * 100)*100)/100 ; 
      if(newnumber > oldnumber){
        color = "success"
        positive = true;
      } else if(newnumber < oldnumber) {
        color = "error"
      } else {
        return;
      }
      return <Chip variant='outlined' color={color} sx={{mr:1}} label={(positive ? ' + ' : ' - ') + "%"+percentage} avatar={<Avatar src={chains[chn].logo} />} />
    }
  )
  console.log(badges);

  useEffect(() => {
    // run something every time name changes
    var yydata = [];
    for( let j = 0; j < chains.length; j++ ){
      var num = 0 ;
      var obj = {};
      obj['chain'] = chains[j].name;
      for (let i = 0; i < orgdata.length; i++) {
          if(selectedChains.indexOf(j) < 0) {
              num = null ;
          } else {
              num += Number(orgdata[i][chains[j].name.toLowerCase()+'_'+y]);
          }
      }

      if(num !== null){
        obj[y] = Math.round(num/orgdata.length) ;
        yydata.push(obj);
        num = 0 ;
      }
    }
  
      yydata.sort((a, b) => b[y] - a[y]);
      setYdata(yydata);

  }, [selectedChains]);

    return (
      <Paper variant="outlined" sx={{ backgroundColor:'#f1f1f1', width:'100%', p : '16px 0px',display:'flex',flexDirection:'column',alignItems:'left',justifyContent:'center'}}> 
      <Box sx={{display:'flex',pb:3}} >
        <Grid container>
        <Grid item md={3}>
        <Typography variant="h6" color="CaptionText" sx={{pl:3,pb:1,fontWeight:'bold',flexGrow:1}}>{title}</Typography>
        </Grid>
        <Grid item md={9} className="hidescrollbar" sx={{display:'flex',justifyContent:{lg:'flex-end',sx:'inherit'},overflow:'auto',px:3,scrollbarWidth:'none'}}>
        {badges}
        </Grid>
        </Grid>
      </Box>
      <div style={{width:"100%",height:"100%"}}>
        <Chart padding={[10, 20, 60, 100]} autoFit height={400} data={data} >
        <Legend padding={[200,0,0,0]}/>
          <LineAdvance
            shape="smooth"
            point
            position={`${x}*${y}`}
            color={['chain', selectedChains.map((chn) => chains[chn].color)]}
          />
        </Chart>
      </div>{ydata.length > 0 && 
      <Box display={selectedChains.length > 1 ? 'flex' : 'none'} flexDirection='column' py={2}>
      <Typography variant="h6" component="h3" sx={{p:3,fontWeight:'bold'}} color='CaptionText'>
        Blockchains Ordered By Highest {title}
      </Typography>
      {ydata.length > 1 &&
      <Typography variant="body1" color='CaptionText' px={3} pb={3}>
        Comparing the {ydata.length} selected blockchains, <b>{ydata[0].chain} Network </b> has the highest {title} : <b>{ydata[0][y]}</b>
      </Typography>}
      <Box className="hidescrollbar" sx={{display:'inline-flex',overflow:'auto',px:2,scrollbarWidth:'none'}}>
        {ydata.map((yd,i) => <SingleNumber bgcolor={chains.find(({ name }) => name === yd.chain).color} title={yd.chain} size={i === 0 ? 'h2' : 'h4'} number={ydata[i][y]} sx={{mx:1,width:i === 0 ? 250 : 200}} />)}        
      </Box>
      </Box>}
      </Paper>
    )
  
}

export default LineChart;