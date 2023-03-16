import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button, listClasses } from '@mui/material';
import { auth } from "../index"
import { signOut } from 'firebase/auth';
import LoginModal from '../modal/loginmodal';

const Sidebar = ({ user, watchList, CoinsData }) => {
    const SignOut = () => {
        signOut(auth);
    }
    const [state, setState] = React.useState({
        right: false,
    });
console.log(watchList)
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {user ? (<><Avatar onClick={toggleDrawer(anchor, true)}
                        style={{
                            cursor: "pointer",
                            height: "38",
                            width: "38",
                        }}
                        src={user.photoURL}
                        alt={user.DisplayName || user.email} />
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >

                            <div style={{
                                width: 350,
                                padding: 25,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                fontFamily: "monospace",
                                backgroundColor: "3e3d3dd9"
                            }}>
                                <div style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "20px",
                                    height: "92%",
                                }}>

                                    <Avatar
                                        style={{
                                            width: 200,
                                            height: 200,
                                            cursor: "pointer",
                                            backgroundColor: "#EEBC1D",
                                            objectFit: "contain",
                                        }}
                                        src={user.photoURL}
                                        alt={user.displayName || user.email}
                                    />
                                    <span
                                        style={{
                                            width: "100%",
                                            fontSize: 25,
                                            textAlign: "center",
                                            fontWeight: "bolder",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {user.displayName || user.email}
                                    </span>
                                    <div style={{
                                        flex: 1,
                                        width: "100%",
                                        backgroundColor: "grey",
                                        borderRadius: 10,
                                        padding: 15,
                                        paddingTop: 10,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 12,
                                        overflowY: "scroll",
                                    }}

                                    >
                                        <span style={{ fontSize: 25, }}>
                                            Watchlist
                                        </span>
                                       
                                 
                                        {CoinsData.map((coin) => {
                                            
                                            // return (
                                            //     <div style={{
                                            //         padding: 10,
                                            //         borderRadius: 5,
                                            //         color: "black",
                                            //         width: "100%",
                                            //         display: "flex",
                                            //         justifyContent: "space-between",
                                            //         alignItems: "center",
                                            //         backgroundColor: "#EEBC1D",
                                            //         boxShadow: "0 0 3px black",
                                            //     }}>
                                            //         <span>{coin.name}</span>
                                            //     </div>
                                            // )

                                            if (watchList?.includes(coin?.id))
                                                return (
                                                    <div style={{
                                                                padding: 10,
                                                                borderRadius: 5,
                                                                color: "black",
                                                                width: "100%",
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                backgroundColor: "#EEBC1D",
                                                                boxShadow: "0 0 3px black",
                                                            }}>
                                                        Bitcoin
                                                        
                                                    </div>
                                                );
                                            else return <></>;
                                        })}


                                    </div>
                                </div>
                                <Button
                                    variant="contained"
                                    onClick={SignOut}
                                    style={{
                                        height: "8%",
                                        width: "100%",
                                        backgroundColor: "#EEBC1D",
                                        marginTop: 20,
                                    }}
                                >
                                    Log Out
                                </Button>

                            </div>
                        </Drawer></>) : (
                        <LoginModal />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
export default Sidebar