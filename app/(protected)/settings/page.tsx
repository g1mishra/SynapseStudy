"use client";

import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { updateName, updatePassword, updateUserPref } from "@/lib/auth.service";
import { uploadFileToBucket } from "@/lib/file-upload.service";
import { bucketFilePath } from "@/utils/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import Notifications from "./Notifications";

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
          const imagePath = bucketFilePath("assets", uploadedFile.$id);
          updateUserPref({
            image: imagePath,
          });
          toast.success("Details updated successfully.");
        })
        .catch((err) => {
          toast.error("An unexpected error occured.");
        });
      // Perform image upload logic here
    }
    if (name) {
      updateName(name);
      toast.success("Details updated successfully.");
    }
  };

  return (
    <div className="w-full max-w-md container px-6">
      <div className="flex flex-col items-center">
        <div className="mt-10">
          <label htmlFor="avatar">
            <Avatar
              imageSrc={currentUser?.prefs?.image}
              width={200}
              height={200}
              className="w-28 h-28 shrink-0"
            />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-white"
              htmlFor="inline-full-email"
            >
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="email"
              type="text"
              placeholder="Email"
              disabled
              value={currentUser?.email}
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-white" htmlFor="inline-full-name">
              Name
            </label>
            <input
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="inline-full-name"
              type="text"
              placeholder={currentUser?.name}
              onChange={handleNameChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="button"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

const SecurityTabComponent = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Validate the form inputs and perform the submission logic
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword)
        updatePassword(newPassword, oldPassword)
          .then((user) => {
            toast.success("Password updated.");
          })
          .catch((err) => {
            toast.error(err?.message);
          });
      else {
        toast.error("Passwords do not match.");
      }
    } else {
      toast.error("Please input all fields.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 mt-12">
      <form className="pt-6 pb-8 mb-4">
        <div className=" mb-6">
          <label className="block mb-2 text-sm font-medium text-white" htmlFor="old-password">
            Current Password
          </label>
          <input
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="old-password"
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className=" mb-6">
          <label className="block mb-2 text-sm font-medium text-white" htmlFor="new-password">
            New Password
          </label>
          <input
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="new-password"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className=" mb-6">
          <label className="block mb-2 text-sm font-medium text-white" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
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
    <div className="w-full mx-auto container mt-2 sm:mt-28 mb-10 flex flex-col justify-center items-center">
      <ul className="flex">
        <li className="mb-px mr-1">
          <a
            className={`text-white inline-block px-4 py-2 ${
              activeTab === "general-tab" ? "border font-semibold" : ""
            }`}
            onClick={() => setActiveTab("general-tab")}
            href="#"
          >
            General
          </a>
        </li>
        <li className="mr-1">
          <a
            className={`text-white inline-block px-4 py-2 ${
              activeTab === "security-tab" ? "border font-semibold" : ""
            }`}
            onClick={() => setActiveTab("security-tab")}
            href="#"
          >
            Security
          </a>
        </li>
        <li className="mr-1">
          <a
            className={`text-white inline-block px-4 py-2 ${
              activeTab === "notifications-tab" ? "border font-semibold" : ""
            }`}
            onClick={() => setActiveTab("notifications-tab")}
            href="#"
          >
            Notifications
          </a>
        </li>
      </ul>
      {activeTab === "general-tab" ? <GeneralTabComponent /> : ""}
      {activeTab === "security-tab" ? <SecurityTabComponent /> : ""}
      {activeTab === "notifications-tab" ? <Notifications /> : ""}
    </div>
  );
}
