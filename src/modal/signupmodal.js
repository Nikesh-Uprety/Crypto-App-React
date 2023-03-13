import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Signup from '../pages/Signup';

const Signupmodal=()=> {
    const [opensignup, setOpensignup] = useState(false);
    const handleOpensignup = () => setOpensignup(true);
    const handleClosesignup = () => setOpensignup(false);
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
  return (
    <>
        <button onClick={handleOpensignup} className="block pl-3 rounded text-xl text-white">SignUp</button>
    <Modal
    open={opensignup}
    onClose={handleClosesignup}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <Signup />
    </Box>
  </Modal> 
    </>

  )
}

export default Signupmodal