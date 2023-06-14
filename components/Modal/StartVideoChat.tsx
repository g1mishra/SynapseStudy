import React, { ChangeEvent, FormEvent, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface StartVideoChatProps {
  isOpen: boolean;
  closeModal: () => void;
  joinGroupCall: (name: string, subject: string) => void;
}

const StartVideoChat: React.FC<StartVideoChatProps> = ({ isOpen, closeModal, joinGroupCall }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinGroupCall(name, subject);
    closeModal();
  };

  return (
    <ModalWrapper open={isOpen} onClose={closeModal}>
      <div className="card relative md:shrink-0 w-full mx-4 max-w-full md:max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="text-center text-xl font-semibold mb-2">Start Group Call</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Group name:</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="input input-bordered"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Subject:</span>
            </label>
            <input
              type="text"
              id="subject"
              className="input input-bordered"
              placeholder="Enter subject"
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary flex justify-center disabled:btn-primary"
          >
            Start Call
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default StartVideoChat;
