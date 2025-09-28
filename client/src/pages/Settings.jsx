import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { 
  MdSettings, 
  MdPerson, 
  MdSecurity, 
  MdNotifications, 
  MdLanguage,
  MdColorLens,
  MdStorage,
  MdInfo,
  MdEdit
} from "react-icons/md";
import { FaUserCog, FaShieldAlt, FaBell, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    deadlineReminder: true,
    teamUpdates: true,
    emailNotifications: false,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "english",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success("Notification preferences updated");
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success("Preferences updated");
  };

  const settingSections = [
    {
      id: "profile",
      title: "Profile Settings",
      description: "Manage your personal information and account details",
      icon: <MdPerson className="text-2xl" />,
      color: "bg-blue-500",
      action: () => navigate("/profile"),
      actionLabel: "Edit Profile"
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Password, authentication and privacy settings",
      icon: <MdSecurity className="text-2xl" />,
      color: "bg-red-500",
      action: () => navigate("/change-password"),
      actionLabel: "Change Password"
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Configure how and when you receive notifications",
      icon: <MdNotifications className="text-2xl" />,
      color: "bg-yellow-500",
      component: "notifications"
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize your experience with theme, language and more",
      icon: <MdLanguage className="text-2xl" />,
      color: "bg-green-500",
      component: "preferences"
    }
  ];

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
      
      {Object.entries({
        taskAssigned: "New task assignments",
        taskCompleted: "Task completions",
        deadlineReminder: "Deadline reminders",
        teamUpdates: "Team updates",
        emailNotifications: "Email notifications"
      }).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FaBell className="text-gray-600" />
            <div>
              <p className="text-gray-800">{label}</p>
              <p className="text-sm text-gray-500">
                {key === 'emailNotifications' 
                  ? 'Receive notifications via email'
                  : 'Show in-app notifications'
                }
              </p>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange(key)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications[key] ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications[key] ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderPreferenceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">App Preferences</h3>
      
      {/* Theme Selection */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <MdColorLens className="text-gray-600 text-xl" />
          <div>
            <h4 className="font-medium text-gray-800">Theme</h4>
            <p className="text-sm text-gray-500">Choose your preferred theme</p>
          </div>
        </div>
        <div className="flex gap-3">
          {['light', 'dark', 'auto'].map((theme) => (
            <button
              key={theme}
              onClick={() => handlePreferenceChange('theme', theme)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                preferences.theme === theme
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <FaGlobe className="text-gray-600 text-lg" />
          <div>
            <h4 className="font-medium text-gray-800">Language</h4>
            <p className="text-sm text-gray-500">Select your preferred language</p>
          </div>
        </div>
        <select
          value={preferences.language}
          onChange={(e) => handlePreferenceChange('language', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </select>
      </div>

      {/* Date Format */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <MdInfo className="text-gray-600 text-xl" />
          <div>
            <h4 className="font-medium text-gray-800">Date Format</h4>
            <p className="text-sm text-gray-500">Choose how dates are displayed</p>
          </div>
        </div>
        <select
          value={preferences.dateFormat}
          onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY (European)</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Title title="Settings" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-4">
          {settingSections.map((section) => (
            <div
              key={section.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={section.action}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-white`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                  {section.actionLabel && (
                    <Button
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
                      label={section.actionLabel}
                      icon={<MdEdit />}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Account Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
                <MdSettings className="text-blue-600 text-2xl" />
                Account Overview
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user?.isAdmin 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user?.isAdmin ? 'Administrator' : user?.role}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {user?.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-8">
              {renderNotificationSettings()}
            </div>

            {/* Preference Settings */}
            <div className="mb-8">
              {renderPreferenceSettings()}
            </div>

            {/* System Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MdStorage className="text-gray-600" />
                System Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600">App Version</p>
                  <p className="font-medium">Tasky v1.0.0</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600">Last Login</p>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600">Account Type</p>
                  <p className="font-medium">{user?.isAdmin ? 'Administrator' : 'Standard User'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;