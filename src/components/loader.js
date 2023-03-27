import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const  LinearIndeterminate=()=> {
  return (
    <Box sx={{ width: '100%'}}>
      <LinearProgress sx={{color:'red'}} />
    </Box>
  );
}
export default LinearIndeterminate;
