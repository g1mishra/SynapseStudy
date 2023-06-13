import { ChannelI } from "@/types/study-room";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface CreateChannelModalModalProps {
  open: boolean;
  onClose: () => void;
  onCreateChannelModal: (channel: ChannelI) => void;
  sucessfulCreation?: boolean;
}

const CreateChannelModal: React.FC<CreateChannelModalModalProps> = ({
  open,
  onClose,
  onCreateChannelModal,
  sucessfulCreation,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id: studyRoomId } = useParams();

  const _onClose = () => {
    setName("");
    setDescription("");
    onClose();
  };

  const handleCreateChannelModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channel: ChannelI = {
      name,
      study_room_id: studyRoomId,
      description,
    };

    if (onCreateChannelModal) onCreateChannelModal(channel);
  };

  return (
    <ModalWrapper open={open} onClose={_onClose}>
      <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:max-w-md text-black-primary">
        {sucessfulCreation ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-green-500">Channel created successfully!</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => _onClose()}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center ">Create Channel Room</h2>
            <form className="flex flex-col gap-4 pt-4 sm:pt-8" onSubmit={handleCreateChannelModal}>
              <input
                type="text"
                className="input text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                placeholder="Channel name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                rows={3}
                className="textarea text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                placeholder="About the channel"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mt-4">
                Create
              </button>
            </form>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};

export default CreateChannelModal;
