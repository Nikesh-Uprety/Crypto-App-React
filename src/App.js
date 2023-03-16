import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import {auth} from './index'
import Cards from "./pages/cards";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  let [Coins, setcoins] = useState([]);
  let [user,setuser]=useState(null);
    
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
console.log(user)
  return (
    <> 
    <Navbar user={user} CoinsData={Coins}/>
    <div className="flex justify-center">
    <Cards 
    CoinsData={Coins}
    user={user}
    />
    </div>
    </>
  );
}

export default App;
