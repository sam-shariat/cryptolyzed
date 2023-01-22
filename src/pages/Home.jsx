import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from '../components/Copyright';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import IntLogo from '../components/LogoInteractive';
import bgimage from '../img/background-cryptolyzed.jpg'

const Home = () => {
  return (
    <Container sx={{maxWidth:'100% !important',backgroundImage:`url(${bgimage})`,backgroundSize:'cover'}}>
      <IntLogo />
      <Grid container spacing={2} pt={'180px'}>
        <Grid item md={12} xl={12} xs={12}>
      <Box sx={{ pb: 4}}>
        <Typography sx={{py:1,textAlign:'center'}} variant="body1" align="center">
          <b>Blockchain Analytics, Metrics, Charts and More</b>
        </Typography>
      </Box>
      </Grid>
      <Grid item md={12} xl={12} xs={12}>
      <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
        <NavLink to={'overview'} className="navlink">
          <Button variant='outlined' sx={{height:120,width:'100%'}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>Overview</b>
          </Typography>
          </Button>
        </NavLink>
        </Grid>
        <Grid item md={6} xs={12}>
        <NavLink to={'charts'} className="navlink">
          <Button variant='outlined' sx={{height:120}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>Charts</b>
          </Typography>
          </Button>
        </NavLink>
        </Grid>
        
        <Grid item md={6} xs={12}>
        <NavLink to={'nfts'} className="navlink">
          <Button variant='outlined' sx={{height:120}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>NFTs</b>
          </Typography>
          </Button>
        </NavLink>
        </Grid>
        <Grid item md={6} xs={12}>
        <NavLink to={'about'} className="navlink">
          <Button variant='outlined' sx={{height:120}} fullWidth>
          <Typography sx={{p: 8,textAlign:'center'}} variant="h4" component="h1" align="center" fullWidth>
            <b>About</b>
          </Typography>
          </Button>
        </NavLink>
        </Grid>
      </Grid>
      </Container>
      </Grid>
      </Grid>
      <Copyright />
    </Container>
  );
}

export default Home;
