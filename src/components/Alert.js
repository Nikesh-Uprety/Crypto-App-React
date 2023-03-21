import { Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import { Button } from "flowbite-react";
import { useState } from "react";
import MuiAlert from '@mui/material/Alert';

function AlertFunction() {
        const [open, setOpen] = useState(false);
        const handleClick = () => {
          setOpen(true);
        };
      
        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
        };
      
        return (
          <Stack spacing={2}>
            <Button variant="outlined" onClick={handleClick}>
              Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <MuiAlert onClose={handleClose} severity="success">
                This is a success message!
              </MuiAlert>
            </Snackbar>
          </Stack>
        );
      }
export default AlertFunction