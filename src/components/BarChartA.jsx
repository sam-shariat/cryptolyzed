
import { Box,Typography } from '@mui/material';
import { BarChart } from 'bizcharts';
import { shortenWallet } from '../functions/numberFormat';

const BarChartA =({title,des='',data,x,y,z='percent'})=> {
    return (
        <Box width={'100%'}>
            <Typography variant="h5" component="h3" p={1}>
                {title}
            </Typography>
		<BarChart  
            data={data}
			description={{
				visible: true,
				text: des,
			}}
            legend={{
                visible: false,
                formatter : (val,item) => `${shortenWallet(val,16)}`
            }}
			yField={x}
			xField={y}
            colorField={x}
            label={{
                formatter : val=> val[y]
            }}
            
		/></Box>
	);
}

export default BarChartA;