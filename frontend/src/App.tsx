import logo from "./assets/auction-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlBuilder } from "./utils/urlBuilder";
import AuctionCard from "./components/AuctionCard";
import { Auction } from "./types/Types";

function App() {
  const [auctions, setAuctions] = useState(Array<Auction>());

  useEffect(() => {
    const fetchAuctions = async () => {
      const res = await axios.get(urlBuilder("/api/auctions"));
      setAuctions(res.data);
    };

    fetchAuctions();
  }, []);

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center">
          <img src={logo} className="h-36 p-6" alt="auction logo" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-5">Vickrey Auction</h1>
        <h2 className="text-xl mb-3">Here's the list of available auctions</h2>
        <div>
          {auctions?.length > 0 ? (
            auctions.map((auction) => (
              <AuctionCard key={auction?.id} title={auction?.title} status={auction?.status}></AuctionCard>
            ))
          ) : (
            <div>No auctions at the moment</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
