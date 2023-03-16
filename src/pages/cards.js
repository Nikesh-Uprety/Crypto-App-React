import { useState, useEffect } from "react"
import { Button } from "@mui/material";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../index';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

const Cards = ({ CoinsData, user }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchCoins, setSearchCoins] = useState([]);
    const [watchList, setWatchlist] = useState([]);
    // const [coin, setCoin] = useState();

    // For Search Function
    useEffect(() => {
        if (searchQuery.length > 0) {
            fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
                .then(response => response.json())
                .then(data => setSearchCoins(data.coins));
        } else {
            setSearchCoins([]);
        }
    }, [searchQuery]);

    // const inWatchlist = watchList.includes("bitcoin");
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
          console.log(coin.data().Coins);
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

 // For removing the Coins from the watchList, Not implemented yet!!!!
  const removeFromWatchlist = async (event, coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchList.filter((wish) => wish !== coin) },
        { merge: true }
      );

    } catch (error) {
      console.log(error)
    }
  };


    return (

        <>
        <Sidebar watchList={watchList} />
            <div className="w-full p-4 mt-24 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        Cryptos
                    </h5>
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    </h5>
                    <form>
                        <div className="flex">
                            <div className="relative w-full">
                                <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search your favorite crypto..." required />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <span className="sr-only"></span>
                                </button>
                                <h5 className="text-xl font-bold leading-none pt-2 pl-12 text-gray-900 dark:text-white">
                                    Change in Vol-24 / Current Price
                                </h5>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            searchQuery.length === 0 ? (
                                CoinsData.map((coin) => (
                                    <li className="py-3 sm:py-4" key={coin.id}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img src={coin.image} className="w-8 h-8 rounded-full" alt={coin.name} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {coin.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    Current Market Rank: {coin.market_cap_rank}
                                                </p>
                                                {
                                                    user ? (<>
                                                        <Button variant="outlined" onClick={(event) => addToWatchlist(event, coin.id)} style={{
                                                            color: "#ffa500",
                                                            border: "1px solid white"
                                                        }}>
                                                            Add to Watchlist
                                                            {/* {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"} */}
                                                        </Button>
                                                    </>
                                                    ) : (<Button variant="outlined" style={{
                                                        color: "#ffa500",
                                                        border: "1px solid white"
                                                    }} >Login To Add to Watchlist</Button>)
                                                }

                                            </div>
                                            {
                                                coin.market_cap_change_percentage_24h > 0 ? (
                                                    <div className="inline-flex items-center text-base font-semibold text-green-700 ">
                                                        {coin.market_cap_change_percentage_24h.toFixed(2)} %
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center text-base font-semibold text-red-500">

                                                        {coin.market_cap_change_percentage_24h.toFixed(2)} %
                                                    </div>
                                                )
                                            }
                                            <div className="inline-flex items-center pl-10 text-base font-semibold text-gray-900 dark:text-white">
                                                $ {coin.current_price}
                                            </div>
                                        </div>
                                    </li>
                                ))

                            ) : (
                                searchCoins.map((coin) => (
                                    <li className="py-3 sm:py-4" key={coin.id}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img src={coin.thumb} className="w-8 h-8 rounded-full" alt={coin.name} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {coin.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    Current Market Rank: {coin.market_cap_rank}
                                                </p>

                                            </div>
                                        </div>
                                    </li>
                                ))
                            )
                        }

                    </ul>
                </div>
            </div>

        </>

    )

}
export default Cards