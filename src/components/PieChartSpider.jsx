import { Box,Typography } from '@mui/material';
import { PieChart } from 'bizcharts';
import { abbreviateNumber, shortenWallet } from '../functions/numberFormat';

const PieChartSpider =({title,des='',data,x,y,yLabel=false,percent=true,shorten=true})=> {
    return (
        <Box width={'100%'}>
            <Typography variant="h5" component="h3" p={1}>
                {title}
            </Typography>
		<PieChart 
            data={data}
			description={{
				visible: true,
				text: des,
			}}
            legend={{
                formatter : (val,item) => `${shorten ? shortenWallet(val,16) : val}`
            }}
			radius={0.5}
			angleField={y}
			colorField={x}
			label={{
				visible: true,
				type: 'outer',
				labelHeight: 32,
				content: v => `${(Number(v[y]) > 10000 ? abbreviateNumber(v[y]) : v[y])} ${yLabel ? v[x] : ''} ${percent ? ('( %'+Math.round((v['percent'])*100)+' )'): ''}`
			}}
		/></Box>
	);
}

export default PieChartSpider;