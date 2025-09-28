import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaCogs, FaUser, FaLock, FaBell, FaPalette, FaTimes } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ModalWrapper from "./ModalWrapper";
import ProfileModal from "./ProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import Button from "./Button";

const SettingsModal = ({ open, setOpen }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <FaCogs /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> }
  ];

  const TabButton = ({ tab, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all w-full text-left ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className={`${isActive ? 'text-white' : 'text-gray-500'}`}>
        {tab.icon}
      </span>
      {tab.label}
    </button>
  );

  const GeneralTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaCogs className="text-blue-600" />
        General Settings
      </h3>
      
      <div className="grid gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Application Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Application Name:</span>
              <span className="font-medium">Tasky</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              onClick={() => setOpenProfile(true)}
              className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              label="Edit Profile"
              icon={<FaUser />}
            />
            <Button
              onClick={() => setOpenPassword(true)}
              className="w-full justify-start bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              label="Change Password"
              icon={<FaLock />}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        Profile Management
      </h3>
      
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <FaUser className="text-4xl text-gray-400 mx-auto mb-4" />
        <h4 className="font-medium text-gray-800 mb-2">Manage Your Profile</h4>
        <p className="text-gray-600 mb-4">
          Update your personal information, job title, and other profile details.
        </p>
        <Button
          onClick={() => setOpenProfile(true)}
          className="bg-blue-600 text-white hover:bg-blue-700"
          label="Edit Profile"
          icon={<FaUser />}
        />
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaLock className="text-blue-600" />
        Security Settings
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <FaLock className="text-4xl text-gray-400 mx-auto mb-4" />
          <h4 className="font-medium text-gray-800 mb-2">Password Security</h4>
          <p className="text-gray-600 mb-4">
            Keep your account secure by regularly updating your password.
          </p>
          <Button
            onClick={() => setOpenPassword(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
            label="Change Password"
            icon={<FaLock />}
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Security Tips</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Use a strong, unique password</li>
            <li>• Don't share your login credentials</li>
            <li>• Log out when using shared devices</li>
            <li>• Report suspicious activity immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaBell className="text-blue-600" />
        Notification Preferences
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Task Notifications</h4>
              <p className="text-sm text-gray-600">Get notified about task updates and deadlines</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Team Updates</h4>
              <p className="text-sm text-gray-600">Receive notifications about team activity</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Email Notifications</h4>
              <p className="text-sm text-gray-600">Get email summaries of your activity</p>
            </div>
            <input type="checkbox" className="toggle" />
          </label>
        </div>
      </div>
    </div>
  );

  const AppearanceTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaPalette className="text-blue-600" />
        Appearance
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Theme</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input type="radio" name="theme" defaultChecked className="text-blue-600" />
              <span>Light Theme</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="theme" className="text-blue-600" />
              <span>Dark Theme</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="theme" className="text-blue-600" />
              <span>System Default</span>
            </label>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-3">Display</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span>Compact Mode</span>
              <input type="checkbox" className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span>Show Sidebar</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralTab />;
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'appearance':
        return <AppearanceTab />;
      default:
        return <GeneralTab />;
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <div className="flex flex-col h-full max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaCogs className="text-blue-600" />
              Settings
            </Dialog.Title>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* Content */}
          <div className="flex gap-6 flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 space-y-2">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pr-2">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </ModalWrapper>

      {/* Child Modals */}
      <ProfileModal open={openProfile} setOpen={setOpenProfile} />
      <ChangePasswordModal open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default SettingsModal;