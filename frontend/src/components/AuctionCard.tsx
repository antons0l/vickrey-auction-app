import { useState } from "react";
import BidModal from "./BidModal"
import axios from "axios";
import { urlBuilder } from "../utils/urlBuilder";
import { dateFormatter } from "../utils/dateFormatter";

interface AuctionCardProps {
  id: string
  title: string
  status: string
  endAt: string
  winner: string
  winAmount: string
}

export default function AuctionCard({ id, title, status, endAt, winner, winAmount }: AuctionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleBidSubmit = async (data: { username: string; amount: number }) => {
    const res = await axios.post(urlBuilder("/api/users"), {name: data.username});
    const userId = res.data.id;
    await axios.post(urlBuilder("/api/bids"), {auctionId: id, userId, amount: data.amount});    
  }
  
  return (
    <div className="max-w-sm mx-auto p-6 bg-slate-50 rounded-lg shadow-xl m-5">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-1 items-center">
          <p className="text-sm text-gray-500">Auction status:</p>
          <p className={`text-sm ${(status === 'CLOSED') ? "text-slate-500" : "text-blue-600"}`}>{status}</p>
        </div>

        {(status === 'CLOSED') ? (<p className="text-sm text-gray-500">Ended at {dateFormatter(endAt)}</p>) : (<p className="text-sm text-gray-500">Ends at {dateFormatter(endAt)}</p>)}
        {(status === 'CLOSED') ? (<p className="p-3 text-sm text-gray-500">{(winner) ? `Winner is ${winner} with the bid of ${winAmount}` : "No winners"}</p>) : <></>}
        {(status === 'OPEN') ? <button className={`bg-[#f8c10e] mt-5 px-6 py-1 text-white rounded-lg shadow-md transition-transform focus:outline-none hover:scale-105`} onClick={handleOpenModal}>bid</button> : <></>}
      </div>
      <BidModal isOpen={isModalOpen} onClose={(handleCloseModal)} onSubmit={(handleBidSubmit)}/>
    </div>
  )
}