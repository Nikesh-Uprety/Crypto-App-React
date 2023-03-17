import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = ({ user,CoinsData,watchList }) => {
  return (
    <>

    <nav className="bg-black px-2 sm:px-4 py-2. bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 border-gray-700">
      <div className="container flex flex-wrap items-center justify-between ">
        <a href="/" className="flex items-center">
          <img src="https://yt3.ggpht.com/yti/AHXOFjXDxlpJaOKwfBrJqnH7JH27ffV7h2mM_uZEznz5nSQ=s88-c-k-c0x00ffffff-no-rj-mo" className="h-6 mr-3 sm:h-9 rounded-full " alt="NikuCoinCap" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">NikuCoinCap</span>
        </a>

        <div className="flex md:order-2">

          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400hover:bg-gray-700focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <Link to="/">
                <button href="#" className="block py-2 pl-3 pr-4 rounded text-xl text-white" aria-current="page">Trending Cryptos</button>
              </Link>
            </li>
            <li>
              <Link to='/about'>
                <button href="#" className="block py-2 pl-3 pr-4rounded text-xl text-white">About</button>
              </Link>
            </li>
            <li>
              <a href="https://github.com/Nikesh-Uprety/Crypto-App-React.git" target="_blank" className="block py-2 pl-3 pr-4 rounded text-xl text-white">Source</a>
            </li>
            <li className="block py-2 pl-3 pr-4 text-xl text-white">
              
              <Sidebar 
              user={user} 
              CoinsData={CoinsData}
              watchList={watchList}
              />
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    </>

  )
}
export default Navbar