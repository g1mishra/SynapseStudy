import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface RequestToJoinModalProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
  onSendRequest: (message: string, roomId: string) => void;
}

const RequestToJoinModal: React.FC<RequestToJoinModalProps> = ({
  open,
  onClose,
  roomId,
  onSendRequest,
}) => {
  const [message, setMessage] = useState("");

  const _onClose = () => {
    setMessage("");
    onClose();
  };

  const handleSendRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendRequest(message, roomId);
  };

  return (
    <ModalWrapper open={open} onClose={_onClose}>
      <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:max-w-md">
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">Request to Join</h2>
          <form className="flex flex-col gap-4 pt-4 sm:pt-8" onSubmit={handleSendRequest}>
            <textarea
              rows={3}
              className="textarea text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              placeholder="Message to owner (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="btn btn-primary mt-4">
              Send Request
            </button>
            <button type="button" className="btn btn-secondary mt-2" onClick={_onClose}>
              Cancel
            </button>
          </form>
        </>
      </div>
    </ModalWrapper>
  );
};

export default RequestToJoinModal;
