import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import NewNavbar from "./components/NewNavbar";
import Cards from "./pages/cards";

function App() {
  let [Coins, setcoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
      .then(response => response.json())
      .then(data => setcoins(data));
  }, []);
  console.log(Coins);


  return (
    <> 
      <Navbar />
    <div className="flex justify-center">
    <Cards CoinsData={Coins}/>
    </div>
    </>
  );
}

export default App;
