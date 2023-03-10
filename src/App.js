import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/cards";

function App() {
  let [Coins, setcoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then(response => response.json())
      .then(data => setcoins(data.coins));
  }, []);


  return (
    <> 
      <Navbar />
    <div className="flex justify-center">
    <Cards setCoinsData={Coins}/>
    </div>
    </>
  );
}

export default App;
