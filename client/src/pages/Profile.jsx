import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { FaUser, FaEnvelope, FaBriefcase, FaUserTag, FaSave } from "react-icons/fa";
import { MdEdit, MdCancel } from "react-icons/md";
import { setCredentials } from "../redux/slices/authSlice";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../redux/slices/apiSlice";
import Title from "../components/Title";
import Loading from "../components/Loader";
import Button from "../components/Button";
import Textbox from "../components/Textbox";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  // API hooks
  const { data: profileData, isLoading, error, refetch } = useGetUserProfileQuery();
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    if (profileData?.user) {
      reset({
        name: profileData.user.name,
        title: profileData.user.title,
        role: profileData.user.role,
      });
    }
  };

  const handleSave = async (data) => {
    try {
      const result = await updateProfile(data).unwrap();
      
      // Update Redux store with new user data
      dispatch(setCredentials(result.user));
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch(); // Refetch profile data
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">Error loading profile: {error?.data?.message || "Something went wrong"}</p>
        <Button
          onClick={() => refetch()}
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          label="Try Again"
        />
      </div>
    );
  }

  const user = profileData?.user;

  return (
    <div className="w-full">
      <Title title="User Profile" />

      <div className="w-full md:w-2/3 bg-white px-8 py-8 shadow-md rounded-lg mt-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.title}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${ 
                user?.isAdmin 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user?.isAdmin ? 'Administrator' : user?.role}
              </span>
            </div>
          </div>
          
          {!isEditing && (
            <Button
              onClick={handleEdit}
              icon={<MdEdit />}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              label="Edit Profile"
            />
          )}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit(handleSave)}>
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded bg-gray-50">
                  <FaEnvelope className="text-gray-500" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaBriefcase className="text-blue-600" />
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
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
                  disabled={!isEditing}
                />
              </div>

              <div>
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
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserTag className="text-blue-600" />
              Account Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Account Status</label>
                <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                  user?.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Member Since</label>
                <p className="text-gray-700 p-2">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                icon={<FaSave />}
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                label={isUpdating ? "Saving..." : "Save Changes"}
                disabled={isUpdating}
              />
              
              <Button
                type="button"
                onClick={handleCancel}
                icon={<MdCancel />}
                className="bg-gray-500 text-white hover:bg-gray-600 flex items-center gap-2"
                label="Cancel"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;