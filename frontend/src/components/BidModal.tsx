import { useState } from "react";
import Modal from "./Modal";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; amount: number }) => void;
}

const BidModal = ({
  isOpen,
  onClose,
  onSubmit,
}: BidModalProps) => {
  const [username, setUserName] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, amount });
    setUserName("");
    setAmount(0);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Set the bid</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="w-20 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            type="submit"
            className="w-20 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BidModal;
