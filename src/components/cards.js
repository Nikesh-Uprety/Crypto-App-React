import { useState,useEffect } from "react"
import axios from "axios";
import debounce from "../helpers/debounce";

const Cards = ({ CoinsData }) => {

    let [searchcoins, setsearchcoins] = useState([]);
    
    let [searchbox, setsearchbox] = useState('');

    useEffect(() => {
        if (searchbox.length >0){
            fetch(`https://api.coingecko.com/api/v3/search?query=${searchbox}`)
              .then(response => response.json())
              .then(data => setsearchcoins(data.coins));
        }else{
            setsearchbox('');
        }
      },[searchbox]);

console.log(searchcoins);    
    return (
        <>
            <div className="w-full p-4 mt-24 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        {
                            searchbox.length >0 ? 'Searched Result' : 'Trending Coins'
                        }
                        </h5>
                    
                        <form>
                            <div className="flex">
                                <div className="relative w-full">
                                    <input type="search" value={searchbox} onChange={e => setsearchbox(e.target.value)} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search your favorite crypto..." required />
                                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                  
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {searchcoins.map((coin) => (
                            <li className="py-3 sm:py-4" key={coin.id}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src={coin.thumb} className="w-8 h-8 rounded-full" alt={coin.name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {coin.name}
                                        </p>
                                        
                                    </div>
                                </div>
                            </li>
                            // <li className="py-3 sm:py-4" key={coin.item.id}>
                            //     <div className="flex items-center space-x-4">
                            //         <div className="flex-shrink-0">
                            //             <img src={coin.item.thumb} className="w-8 h-8 rounded-full" alt={coin.name} />
                            //         </div>
                            //         <div className="flex-1 min-w-0">
                            //             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            //                 {coin.item.name}
                            //             </p>
                            //             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            //                 Current Market Rank: {coin.item.market_cap_rank}
                            //             </p>
                            //         </div>
                            //         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            //             $ {coin.item.price_btc * 19645}
                            //         </div>
                            //     </div>
                            // </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </>

    )

}
export default Cards