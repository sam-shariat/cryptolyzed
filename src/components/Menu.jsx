import { CopyAll, DataObject } from "@mui/icons-material";
import { useMediaQuery, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Snackbar, Typography, IconButton, Tooltip } from "@mui/material";
import * as React from 'react';
import { useState } from "react";
import Highlight from "react-highlight";

const GeneralMenu = ({days,selectedChains,title,query})=> {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [queryModalOpen, setQueryModalOpen] = React.useState(false);
  const [queryCopied, setQueryCopied] = React.useState(false);
  const handleQueryModalOpen = () => setQueryModalOpen(true);
  const handleQueryModalClose = () => setQueryModalOpen(false);
  const handleSnackClose = () => setQueryCopied(false);
  const handleQueryCopy = () => {
    navigator.clipboard.writeText(query.join('/n'));
    setQueryCopied(true);
  }

  var date = new Date();
  var yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - 1);
  var datebefore = new Date(date.getTime());
  datebefore.setDate(date.getDate() - days);
  const fromdate = datebefore.toLocaleDateString("en-US", { year:'numeric', month: 'short', day: 'numeric' });
  const todate = yesterday.toLocaleDateString("en-US", { year:'numeric', month: 'short', day: 'numeric' });
   const render = (
   <Grid container spacing={2}>
    <Grid item md={12} xs={12} lg={12}>
    <Paper variant="outlined" sx={{ width:'100%', p : 2,display:'flex'}}>
   <Typography variant={xs ? "caption" : (sm ? "h6" : (md ? "h6" : (lg ? "h5" : "h5")))} component='h4' flexGrow={1}>
   {title} From {fromdate} {days > 1 && `To ${todate}`} 
   </Typography>
   <Tooltip title="Query"><IconButton onClick={handleQueryModalOpen} ><DataObject /></IconButton></Tooltip>
</Paper>
<Dialog fullWidth
        maxWidth={'lg'}
        open={queryModalOpen}
        onClose={handleQueryModalClose}
        scroll='paper'
        aria-labelledby="blockchain-query"
        aria-describedby="blockchain-queries-and-metrics"
      >
        <DialogTitle id="blockchain-queries">Queries</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{
          query.map((q) => 
          <Paper variant='outlined' sx={{p:2,mb:2}}>
            <Highlight language="sql">{q}</Highlight>
            </Paper>
          )
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQueryModalClose}>Cancel</Button>
          <Button onClick={handleQueryCopy} startIcon={<CopyAll />}>Copy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={queryCopied}
        anchorOrigin={{vertical: 'bottom',horizontal: 'center'}}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message="Query Copied"
      />
  </Grid>
</Grid>);
    return render;
}

export default GeneralMenu;