import { useState, useEffect } from "react";
import {auth, db} from './index'
import Cards from "./pages/cards";
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import NewNavBar from "./components/NewNavbar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function App() {
  let [Coins, setcoins] = useState([]);
  let [user,setuser]=useState(null);
  const [watchList, setWatchlist] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
    time:3000,
  });

  const AlertFunction = () => {
    const handleCloseAlert = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setAlert({ open: false });
    };
  
    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={alert.time}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          onClose={handleCloseAlert}
          elevation={10}
          variant="filled"
          severity={alert.type}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    );
  };
  
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => setcoins(data));
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
        console.log(`Welcome ${user.email}`);
      }else {
        setuser(null)
      };
    });
  }, []);

  const addToWatchlist = async (event, coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
        await setDoc(
            coinRef,
            { Coins: watchList ? [...watchList, coin] : [coin] },
            { merge: true }
        );
        setAlert({
          open: true,
          message: `Successfully Added ${coin}`,
          type: "success",
          time:1500,
      })

    } catch (e) {
        console.log(e);
    }
}

useEffect(() => {
  if (user) {
    const coinRef = doc(db, "watchlist", user?.uid);
    var unsubscribe = onSnapshot(coinRef, (coin) => {
      if (coin.exists()) {
        setWatchlist(coin.data().Coins);
      } else {
        console.log("No Items in Watchlist");
      }
    });

    return () => {
      unsubscribe();
    };
  }
}, [user])

//  For removing the Coins from the watchList, Not implemented yet!!!!
  const removeFromWatchlist = async (event, coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { Coins: watchList.filter((wish) => wish !== coin) },
        { merge: true }
        );
        setAlert({
          open: true,
          message: `Successfully Removed ${coin}`,
          type: "error",
          time:1500,
      })
        console.log("removed succesfull");

    } catch (error) {
      console.log(error)
    }
  };


  return (
    <> 
    <getWatchlist user={user} />
    <NewNavBar
    setAlert={setAlert}
    removeFromWatchlist={removeFromWatchlist}
    user={user} 
    CoinsData={Coins}
    watchList={watchList}
    />
    <div className="flex justify-center">
    <Cards 
    watchList={watchList}
    removeFromWatchlist={removeFromWatchlist}
    addToWatchlist={addToWatchlist}
    CoinsData={Coins}
    user={user}
    setAlert={setAlert}
    />
    </div>
    <AlertFunction/>
    </>
  );
}


export default App;
