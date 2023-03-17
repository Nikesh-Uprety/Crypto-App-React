import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {auth, db} from './index'
import Cards from "./pages/cards";
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";



function App() {
  let [Coins, setcoins] = useState([]);
  let [user,setuser]=useState(null);
  const [watchList, setWatchlist] = useState([]);

    
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => setcoins(data));
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setuser(user);
      else setuser(null);
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
        console.log(`Successfully Added ${coin}`)
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
        console.log("removed succesfull");

    } catch (error) {
      console.log(error)
    }
  };


  return (
    <> 
    <getWatchlist user={user} />
    <Navbar 
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
    />
    </div>
    </>
  );
}


export default App;
