import { Box, Paper, Typography } from "@mui/material";
import { abbreviateNumber } from "../functions/numberFormat";

const SingleNumber = ({title,number,bgcolor='#121212',size='h2',bold='500',roundTo=100,noAbbreviate=false,sx=null}) => {
    return <Box sx={sx} >
        <Paper variant="outlined" sx={{ width:'100%', p : '36px 8px',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:bgcolor}}>
            <Typography variant='h5' component='h4' sx={{px:2}}>
            {title}
            </Typography>
            <Typography variant={size} component='h2' sx={{px:2,fontWeight:bold}}>
            {noAbbreviate ? Math.round(number*roundTo)/roundTo : abbreviateNumber(Math.round(number*roundTo)/roundTo)}
            </Typography>
        </Paper>
        </Box>

}

export default SingleNumber;