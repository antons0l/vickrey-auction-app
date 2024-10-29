import { useState } from "react";
import BidModal from "./BidModal"
import axios from "axios";
import { urlBuilder } from "../utils/urlBuilder";

interface AuctionCardProps {
  id: string
  title: string
  status: string
  endAt: string
}

export default function AuctionCard({ id, title, status, endAt }: AuctionCardProps) {
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
      <div className="flex justify-center space-x-1 items-center">
        <p className="text-sm text-gray-500">status:</p>
        <p className={`text-sm ${(status === 'CLOSED') ? "text-slate-500" : "text-blue-600"}`}>{status}</p>
      </div>

      {(status === 'CLOSED') ? (<p className="text-sm text-gray-500">ended at {endAt}</p>) : (<p className="text-sm text-gray-500">ends at {endAt}</p>)}

      <button disabled={(status === 'CLOSED')} className={`bg-[#f8c10e] disabled:bg-gray-500 mt-5 px-6 py-1 text-white rounded-lg shadow-md transition-transform focus:outline-none hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed`} onClick={handleOpenModal}>bid</button>
      <BidModal isOpen={isModalOpen} onClose={(handleCloseModal)} onSubmit={(handleBidSubmit)}/>
    </div>
  )
}