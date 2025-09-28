import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdSecurity, MdVpnKey } from "react-icons/md";
import { useChangeUserPasswordMutation } from "../redux/slices/apiSlice";
import Title from "../components/Title";
import Button from "../components/Button";
import Textbox from "../components/Textbox";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // API hook
  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch new password for confirmation validation
  const newPassword = watch("newPassword");

  const handlePasswordChange = async (data) => {
    try {
      await changePassword({ password: data.newPassword }).unwrap();
      
      toast.success("Password changed successfully!");
      reset(); // Clear the form
    } catch (err) {
      console.error("Password change error:", err);
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  const passwordStrengthCheck = (password) => {
    if (!password) return { score: 0, message: "" };
    
    let score = 0;
    let messages = [];

    if (password.length >= 8) score += 1;
    else messages.push("At least 8 characters");

    if (/[a-z]/.test(password)) score += 1;
    else messages.push("One lowercase letter");

    if (/[A-Z]/.test(password)) score += 1;
    else messages.push("One uppercase letter");

    if (/\d/.test(password)) score += 1;
    else messages.push("One number");

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else messages.push("One special character");

    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

    return {
      score,
      strength: strengthLevels[score] || "Very Weak",
      color: colors[score] || "bg-red-500",
      missing: messages,
    };
  };

  const passwordStrength = passwordStrengthCheck(newPassword);

  return (
    <div className="w-full">
      <Title title="Change Password" />

      <div className="w-full md:w-2/3 lg:w-1/2 bg-white px-8 py-8 shadow-md rounded-lg mt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <MdSecurity className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Security Settings</h2>
              <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <MdVpnKey className="text-blue-600" />
            Password Security Tips
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use at least 8 characters</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Add numbers and special characters</li>
            <li>• Avoid using personal information</li>
          </ul>
        </div>

        {/* Password Change Form */}
        <form onSubmit={handleSubmit(handlePasswordChange)}>
          {/* Current Password */}
          <div className="mb-6">
            <label className="text-gray-800 text-sm mb-2 block font-medium">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-2 block font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.newPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: "Password must contain uppercase, lowercase, number and special character"
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Password Strength:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength.score >= 4 ? 'text-green-600' : 
                  passwordStrength.score >= 3 ? 'text-blue-600' : 
                  passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
              {passwordStrength.missing.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Missing requirements:</p>
                  <div className="flex flex-wrap gap-1">
                    {passwordStrength.missing.map((req, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-8">
            <label className="text-gray-800 text-sm mb-2 block font-medium">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === newPassword || "Passwords do not match"
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              icon={<FaLock />}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 flex-1"
              label={isLoading ? "Changing Password..." : "Change Password"}
              disabled={isLoading || passwordStrength.score < 3}
            />
            
            <Button
              type="button"
              onClick={() => reset()}
              className="bg-gray-500 text-white hover:bg-gray-600 px-6"
              label="Reset Form"
            />
          </div>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> After changing your password, you may need to log in again on other devices.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;