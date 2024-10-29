import logo from "./assets/auction-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlBuilder } from "./utils/urlBuilder";
import AuctionCard from "./components/AuctionCard";
import { Auction } from "./types/Types";
import CreateAuctionModal from "./components/CreateAuctionModal";

function App() {
  const [auctions, setAuctions] = useState(Array<Auction>());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchAuctions = async () => {
    const res = await axios.get(urlBuilder("/api/auctions"));
    setAuctions(res.data);
  };

  const handleCreateAuctionSubmit = async (data: { title: string; endAt: string }) => {
    await axios.post(urlBuilder("/api/auctions"), data);
    fetchAuctions();
  }

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center">
          <img src={logo} className="h-36 p-6" alt="auction logo" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-5">Vickrey Auction</h1>
        <button className={`bg-[#1c4c84] disabled:bg-gray-500 px-6 py-1 text-white rounded-lg shadow-md focus:outline-none transition-transform hover:scale-105 disabled:hover:scale-100`} onClick={handleOpenModal}>create an auction</button>
        <div>
          {auctions?.length > 0 ? (
            auctions.map((auction) => (
              <AuctionCard key={auction?.id} id={auction?.id} title={auction?.title} status={auction?.status} endAt={auction?.endAt}></AuctionCard>
            ))
          ) : (
            <div>No auctions available</div>
          )}
        </div>
      </div>
      <CreateAuctionModal isOpen={isModalOpen} onClose={(handleCloseModal)} onSubmit={handleCreateAuctionSubmit}/>
    </>
  );
}

export default App;
