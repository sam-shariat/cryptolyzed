import React from 'react';
import logo from '../img/logo.png';

const styles = {
    bg : {
      backgroundColor : '#ffffff',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      display : 'flex',
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      height:'100vh',
    },
}

function Splash () {

    return (
      
        <div style={styles.bg}>
        <img width={250} height={250} src={logo} alt='Cryptolyzed Logo'/>
        </div>
      
      )
    
        
}

export default Splash ;
