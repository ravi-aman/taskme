import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";
import { FaUser, FaEnvelope, FaBriefcase, FaUserTag, FaSave } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { setCredentials } from "../redux/slices/authSlice";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../redux/slices/apiSlice";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import Textbox from "./Textbox";
import Loading from "./Loader";

const ProfileModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  // API hooks
  const { data: profileData, isLoading, error } = useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Set form values when profile data is loaded
  useEffect(() => {
    if (profileData?.user) {
      reset({
        name: profileData.user.name,
        title: profileData.user.title,
        role: profileData.user.role,
      });
    }
  }, [profileData, reset]);

  const handleSave = async (data) => {
    try {
      const result = await updateProfile(data).unwrap();
      
      // Update Redux store with new user data
      dispatch(setCredentials(result.user));
      
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="py-10">
          <Loading />
        </div>
      </ModalWrapper>
    );
  }

  if (error) {
    return (
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="py-10 text-center">
          <p className="text-red-500">Error loading profile: {error?.data?.message || "Something went wrong"}</p>
        </div>
      </ModalWrapper>
    );
  }

  const user = profileData?.user;

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-600" />
            Edit Profile
          </Dialog.Title>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* User Avatar and Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <FaEnvelope className="text-sm" />
              {user?.email}
            </p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
              user?.isAdmin 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {user?.isAdmin ? 'Administrator' : user?.role}
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Textbox
            placeholder="Full Name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register("name", {
              required: "Name is required!",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              }
            })}
            error={errors.name ? errors.name.message : ""}
          />

          <Textbox
            placeholder="Job Title"
            type="text"
            name="title"
            label="Job Title"
            className="w-full rounded"
            register={register("title", {
              required: "Title is required!"
            })}
            error={errors.title ? errors.title.message : ""}
          />

          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded"
            register={register("role", {
              required: "Role is required!"
            })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Account Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user?.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div>
              <p className="text-gray-600">Account Type</p>
              <p className="font-medium">{user?.isAdmin ? 'Administrator' : 'Standard User'}</p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            icon={<FaSave />}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 flex-1"
            label={isUpdating ? "Saving..." : "Save Changes"}
            disabled={isUpdating}
          />
          
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-gray-500 text-white hover:bg-gray-600 px-6"
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ProfileModal;