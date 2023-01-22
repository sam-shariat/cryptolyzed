import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Avatar, Box, Button, Checkbox, Modal, Typography } from '@mui/material';
import chains from '../data/chains';

const ChainsModal = ({open,onClose,onClick,selectedChains}) => {

    return <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="select-chain"
    aria-describedby="select-blockchain-for-metrics-data">
    <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          border: 'none',
          boxShadow: 24,
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          py: 2
        }} className="ChainsContainer">
          <Typography variant="h6" >Select Chain(s)</Typography>
    <Box sx={{
          display:'flex',
          flexWrap:'wrap',
          p: 2
        }}>
      
    {chains.map((chain,index) =>
          <Button 
          disabled={index === 0 || chain.name === "Algorand" || chain.name === "Optimism"}
          onClick={ () => onClick(index)} 
          variant="outlined" 
          sx={{ borderRadius:25, width: { xs: '100%', sm: 'auto' },height: { xs: 50, sm: 'auto' }, m:1 , p : '8px 8px',display:'flex',alignItems:'center'}}>
            <Avatar 
            style={{border:'1px solid #121212'}} 
            sx={{backgroundColor:'primary.dark',mr:1}} 
            alt={chain.name} 
            src={chain.logo} />
            <Typography >{chain.name}</Typography>
            <Checkbox 
            checked={selectedChains.indexOf(index) >= 0} 
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
            disableRipple
            disabled={chain.name === "Algorand" || chain.name === "Optimism"}
            />
          </Button>
          )}
    </Box>
    <Box display={'flex'}>
      <Button 
    size="large" 
    sx={{mx:2}} 
    className="saveButton" 
    color="success" 
    variant="outlined" 
    onClick={onClose} >
      <b>Save Changes</b>
    </Button>
    <Button 
    size="large" 
    sx={{mx:2}} 
    className="selectAllChainsButton" 
    color="primary" 
    variant="outlined" 
    onClick={() => onClick(0,selectedChains.length === chains.length ? '2' : '1')} >
      <b>{selectedChains.length === chains.length ? 'Remove All Chains but Ethereum' : 'Select All Chains'}</b>
    </Button>
    </Box>
    </Box>
  </Modal>
}

export default ChainsModal;