interface AuctionCardProps {
  title: string
  status: string
  endAt: string
}

export default function AuctionCard({ title, status, endAt }: AuctionCardProps) {
  const handleClickBid = () => {
    console.log("todo bid func")
  }
  return (
    <div className="max-w-sm mx-auto p-6 bg-slate-50 rounded-lg shadow-xl m-5">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="flex justify-center space-x-1 items-center">
        <p className="text-sm text-gray-500">status:</p>
        <p className={`text-sm ${(status === 'CLOSED') ? "text-red-500" : "text-green-500"}`}>{status}</p>
      </div>

      {(status === 'CLOSED') ? (<p className="text-sm text-gray-500">ended</p>) : (<p className="text-sm text-gray-500">ends at: {endAt}</p>)}

      <button disabled={(status === 'CLOSED')} className={`bg-green-500 disabled:bg-gray-500 mt-5 px-6 py-1 text-white rounded-lg shadow-md focus:outline-none hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed`} onClick={handleClickBid}>bid</button>
    </div>
  )
}