import logo from './assets/auction-logo.svg'
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlBuilder } from './utils/urlBuilder';
import { Auction } from '../../backend/src/db/schema';

function App() {
  const [auctions, setAuctions] = useState(new Array<Auction>);

  useEffect(()=> {
    console.log("debug check var: " + import.meta.env.VITE_API_URL + " " + urlBuilder("/api/auctions"))
    const fetchAuctions = async () => {
      const res = await axios.get(urlBuilder("/api/auctions"));
      console.log("debug " + JSON.stringify(res.data))
      setAuctions(res.data)
    }

    fetchAuctions();
  }, [])

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="auction logo" />
      </div>
      <h1>Vickrey Auction</h1>
      <div>{auctions.map(auction => <div key={auction?.id}>{auction?.title}</div>)}</div>
    </>
  )
}

export default App
