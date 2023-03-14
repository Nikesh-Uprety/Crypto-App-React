import * as React from 'react';
import Drawer from '@mui/material/Drawer';

import { Avatar, Button } from '@mui/material';
import { auth } from "../index"
import { signOut } from 'firebase/auth';
import LoginModal from '../modal/loginmodal';

const Sidebar = ({ user }) => {
    const SignOut = () => {
        signOut(auth);
    }
    const [state, setState] = React.useState({
        right: false,
    });

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
                        alt={user.DisplayName || user.email} /><Drawer
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
                                        alt={user.displayName || user.email} />
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
                                        <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                            Watchlist
                                        </span>
                                        {/* {coins.map((coin) => {
if (watchlist.includes(coin.id))
return (
<div className={classes.coin}>
<span>{coin.name}</span>
<span style={{ display: "flex", gap: 8 }}>
{symbol}{" "}
{numberWithCommas(coin.current_price.toFixed(2))}
<AiFillDelete
style={{ cursor: "pointer" }}
fontSize="16"
onClick={() => removeFromWatchlist(coin)}
/>
</span>
</div>
);
else return <></>;
})} */}
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