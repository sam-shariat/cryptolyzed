import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from "react";
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowDimensions;
  }

  

const LineChartTXS =(props)=> {

    const { height, width } = useWindowDimensions();
    const [ chains , setChains ] = useState(props.chains_data.map((chain) => chain.name));

    const legendClicked = (o) => {
        const { dataKey } = o;
        console.log(dataKey);
        if (chains.indexOf(dataKey)) {
            setChains(chains.filter(e => e !== dataKey));
        } else {
            setChains(chains => [...chains,dataKey]);
        }
    }

    return (
      <div style={{width:"100%",height:"100%"}}>
        {console.log(data)}
        {chains && 
        <LineChart
          width={width}
          height={500}
          data={props.data}
          margin={{
            top: 8,
            right: width > 1000 ? 120 : 96,
            left: 24,
            bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip />
          <Legend 
          verticalAlign="top" 
          height={40}
          iconType={'circle'}
          iconSize={18}
          onClick={legendClicked}
          margin={{top: 32,
            right: 0,
            left: 0,
            bottom: 8,}} />
          {chains.map((chain,i) => 
          <Line strokeWidth={2} type="monotone" dataKey={chain} stroke={props.chains_data[i].color} fill={props.chains_data[i].color} />)}
        </LineChart>
        }
      </div>
    )
  
}

export default LineChartTXS;