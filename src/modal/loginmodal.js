import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Login from '../pages/Login';

function LoginModal({setAlert}) {
    const [openlogin, setOpenlogin] = useState(false);
    const handleOpenlogin = () => setOpenlogin(true);
    const handleCloselogin = () => setOpenlogin(false);

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
        <button onClick={handleOpenlogin} style={{border:"1px solid black"}}className="block p-2 rounded text-xl text-black">Login</button>
                      <Modal
                      open={openlogin}
                      onClose={handleCloselogin}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Login setAlert={setAlert}/>
                      </Box>
                    </Modal>
    </>

  )
}

export default LoginModal