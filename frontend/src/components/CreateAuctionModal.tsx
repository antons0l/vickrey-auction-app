import { useState } from "react";
import Modal from "./Modal";

interface CreateAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; endAt: string }) => void;
}

const CreateAuctionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateAuctionModalProps) => {
  const [title, setTitle] = useState("");
  const [endAt, setEndAt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, endAt });
    setTitle("");
    setEndAt("");
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Create a new auction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-around">
          <button
            onClick={onClose}
            className="w-20 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
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

export default CreateAuctionModal;
