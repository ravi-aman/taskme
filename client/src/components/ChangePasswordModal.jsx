import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { FaLock, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useChangeUserPasswordMutation } from "../redux/slices/apiSlice";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import Textbox from "./Textbox";

const ChangePasswordModal = ({ open, setOpen }) => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // API hook
  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }).unwrap();
      
      toast.success("Password changed successfully!");
      reset();
      setOpen(false);
    } catch (err) {
      console.error("Password change error:", err);
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaLock className="text-blue-600" />
            Change Password
          </Dialog.Title>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Security Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <FaLock className="text-blue-600" />
            Security Guidelines
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use at least 8 characters</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
          </ul>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <Textbox
              placeholder="Enter current password"
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              label="Current Password"
              className="w-full rounded pr-10"
              register={register("currentPassword", {
                required: "Current password is required!"
              })}
              error={errors.currentPassword ? errors.currentPassword.message : ""}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Textbox
              placeholder="Enter new password"
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              label="New Password"
              className="w-full rounded pr-10"
              register={register("newPassword", {
                required: "New password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: "Password must contain uppercase, lowercase, number and special character"
                }
              })}
              error={errors.newPassword ? errors.newPassword.message : ""}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Textbox
              placeholder="Confirm new password"
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              label="Confirm New Password"
              className="w-full rounded pr-10"
              register={register("confirmPassword", {
                required: "Please confirm your password!",
                validate: (value) =>
                  value === newPassword || "Passwords do not match"
              })}
              error={errors.confirmPassword ? errors.confirmPassword.message : ""}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Password Strength Indicator */}
        {newPassword && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Password Strength:</p>
            <div className="space-y-1">
              <div className={`text-xs flex items-center gap-2 ${
                newPassword.length >= 8 ? 'text-green-600' : 'text-red-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  newPassword.length >= 8 ? 'bg-green-500' : 'bg-red-500'
                }`} />
                At least 8 characters
              </div>
              <div className={`text-xs flex items-center gap-2 ${
                /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'text-green-600' : 'text-red-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-red-500'
                }`} />
                Uppercase and lowercase letters
              </div>
              <div className={`text-xs flex items-center gap-2 ${
                /\d/.test(newPassword) ? 'text-green-600' : 'text-red-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  /\d/.test(newPassword) ? 'bg-green-500' : 'bg-red-500'
                }`} />
                At least one number
              </div>
              <div className={`text-xs flex items-center gap-2 ${
                /[@$!%*?&]/.test(newPassword) ? 'text-green-600' : 'text-red-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  /[@$!%*?&]/.test(newPassword) ? 'bg-green-500' : 'bg-red-500'
                }`} />
                At least one special character
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            icon={<FaSave />}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 flex-1"
            label={isLoading ? "Changing Password..." : "Change Password"}
            disabled={isLoading}
          />
          
          <Button
            type="button"
            onClick={() => {
              reset();
              setOpen(false);
            }}
            className="bg-gray-500 text-white hover:bg-gray-600 px-6"
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ChangePasswordModal;