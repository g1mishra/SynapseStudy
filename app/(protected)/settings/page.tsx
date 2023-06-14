"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Avatar from "@/components/Avatar";
import { uploadFileToBucket } from "@/lib/file-upload.service";
import { useAuth } from "@/hooks/useAuth";
import { updateName, updatePassword, updateUserPref } from "@/lib/auth.service";
import { bucketFilePath } from "@/utils/utils";
import { toast } from "react-toastify";


function GeneralTabComponent() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { currentUser, loading } = useAuth();

  const [name, setName] = useState("");
  // const previewPath = currentUser?.prefs?.image || URL.createObjectURL(selectedImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    // Perform image submission logic here
    if (selectedImage) {
      uploadFileToBucket(currentUser.$id, selectedImage, "assets")
        .then((uploadedFile) => {
          if (!uploadedFile) return;
          const imagePath = bucketFilePath("assets", uploadedFile.$id)
          updateUserPref({
            image: imagePath
          });
          toast.success('Details updated successfully.')
        })
        .catch((err) => {
          toast.error('An unexpected error occured.')
        })
      // Perform image upload logic here
    }
    if (name) {
      updateName(name);
      toast.success('Details updated successfully.')
    }

  };

  return (
    <div className="w-full max-w-sm container mx-auto">
      <div className="flex items-center mb-6">
        <label htmlFor="avatar" className="w-1/3">
          <Avatar width={60} height={60} imageSrc={currentUser?.prefs?.image} />
        </label>
        <div className="w-2/3">
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={handleImageChange}
          />
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="text"
            placeholder="Email"
            disabled
            value={currentUser?.email}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder={currentUser?.name}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>


  );
}


const SecurityTabComponent = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Validate the form inputs and perform the submission logic
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword)
        updatePassword(newPassword, oldPassword)
          .then(user => {
            toast.success('Password updated.')
          })
          .catch(err => {
            toast.error(err?.message);
          })
      else {
        toast.error('Passwords do not match.')
      }
    } else {
      toast.error('Please input all fields.')
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="old-password">
            Current Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="old-password"
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="new-password">
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="new-password"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general-tab");

  return (
    <div className="container m-4">
      <ul className="flex">
        <li className="mb-px mr-1">
          <a className={`text-white inline-block px-4 py-2 ${activeTab === 'general-tab' ? "border font-semibold" : ""}`} onClick={() => setActiveTab('general-tab')} href="#">General</a>

        </li>
        <li className="mr-1">
          <a className={`text-white inline-block px-4 py-2 ${activeTab === 'security-tab' ? "border font-semibold" : ""}`} onClick={() => setActiveTab('security-tab')} href="#">Security</a>

        </li>

      </ul>
      {activeTab === 'general-tab' ? <GeneralTabComponent /> : ''}
      {activeTab === 'security-tab' ? <SecurityTabComponent /> : ''}

    </div>
  );
}
