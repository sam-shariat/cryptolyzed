import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";

function abbreviateNumber(num) {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

function ChainData(props){
    return ( 
    <Grid container spacing={2} sx={{pt:3,pb:3}} id={props.name}>
        <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>  
            <Avatar sx={{mr:1,ml:2,p:'8px 8px',width:'104px',height:'104px'}} alt={props.name} src={props.logo} />
            <Typography variant={"h4"} component="b" id="select-chain-option" style={{display:'flex',alignItems:'center'}}>
            {props.name}</Typography>
              </Paper>
              </Grid>
      <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Total Transactions
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.total_txs*100)/100)}
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Total Blocks
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.total_blocks*100)/100)}
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Avg Block Time (Sec)
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.avg_block_time*100)/100)}
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Max Block Time (Sec)
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.max_block_time*100)/100)}
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Min Block Time (Sec)
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.min_block_time*100)/100)}
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Generated Fees ({props.symbol})
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {Math.round(props.tx_fees*1000)/1000}
                  </Typography>
              </Paper>
              </Grid>  
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Avg Transactions Per Day
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.txs_per_day*100)/100)}
                  </Typography>
              </Paper>
              </Grid>  
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Blocks Per Day
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.blocks_per_day*100)/100)}
                  </Typography>
              </Paper>
              </Grid>  
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Transactions Per Second
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.avg_tps*100)/100)}
                  </Typography>
              </Paper>
              </Grid>  
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Transactions Per Block
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.avg_tpb*100)/100)}
                  </Typography>
              </Paper>
              </Grid>  
              <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography variant='h5' component='h4'>
                  Users Per Day
                  </Typography>
                  <Typography variant='h2' component='h2'>
                  {abbreviateNumber(Math.round(props.users_per_day*100)/100)}
                  </Typography>
              </Paper>
              </Grid>  
              
            </Grid>
    )
  }

  export default ChainData;