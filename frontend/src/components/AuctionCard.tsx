interface AuctionCardProps {
  title: string
  status: string
}

export default function AuctionCard({ title, status }: AuctionCardProps) {
  return (
    <div className="max-w-sm mx-auto p-6 bg-slate-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">Status: {status} </p>
    </div>
  )
}