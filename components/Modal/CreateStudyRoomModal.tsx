import { StudyRoomI } from "@/types/study-room";
import React, { useEffect, useRef, useState } from "react";

interface CreateChatRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreateChatRoom?: (studyRoom: StudyRoomI) => void;
}

type Status = "public" | "private";

const CreateStudyRoomModal: React.FC<CreateChatRoomModalProps> = ({
  open,
  onClose,
  onCreateChatRoom,
}) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setstatus] = useState<string>();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCreateChatRoom = () => {
    const studyRoom: StudyRoomI = {
      name,
      subject,
      status: status as Status,
    };

    if (onCreateChatRoom) onCreateChatRoom(studyRoom);

    setName("");
    setSubject("");
    // setstatus(null);

    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800/20 backdrop-blur-lg">
      <div className="bg-white p-8 rounded-md shadow-lg w-11/12 sm:max-w-md " ref={modalRef}>
        <h2 className="text-2xl font-semibold mb-4">Create Chat Room</h2>
        <form className="flex flex-col gap-4 pt-4 sm:pt-8">
          <input
            type="text"
            className="input border border-gray-300"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input border border-gray-300"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select
            name=""
            id=""
            className="input border border-gray-300"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <button type="button" className="btn btn-primary mt-4" onClick={handleCreateChatRoom}>
            Create Chat Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudyRoomModal;
