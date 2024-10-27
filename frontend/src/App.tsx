import logo from './assets/auction-logo.svg'
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

type Auction = {
  id: string;
  title: string;
}

function App() {
  const [auctions, setAuctions] = useState(new Array<Auction>);

  useEffect(()=> {
    const fetchAuctions = async () => {
      const res = await axios.get(`/api/auctions`);
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
