import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    language: 'English',
    emailNotifications: true,
    pushNotifications: true,
    lightMode: false
  });
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      setProfile({
        name: parsedSettings.name,
        email: parsedSettings.email
      });
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setIsProfileSaved(false);
  };

  const saveProfile = () => {
    setSettings(prev => ({
      ...prev,
      name: profile.name,
      email: profile.email
    }));
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        {/* Profile Settings */}
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={saveProfile}
                disabled={!profile.name || !profile.email}
                className={`px-4 py-2 rounded-md ${!profile.name || !profile.email 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                Save Profile
              </button>
            </div>
            {isProfileSaved && (
              <div className="text-green-500 text-sm text-right">
                Profile saved successfully!
              </div>
            )}
          </div>
        </div>
        
        {/* Appearance Settings */}
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <button 
                onClick={() => {
                  toggleTheme();
                  setSettings(prev => ({ ...prev, lightMode: !prev.lightMode }));
                }}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${!settings.lightMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${!settings.lightMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Language Settings */}
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Language</h2>
          <select
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            className={`w-full p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
        
        {/* Notification Settings */}
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer ${settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800`}>
                  <span className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer ${settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'} peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800`}>
                  <span className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Account Settings */}
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <button className={`w-full text-left py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              Change password
            </button>
            <button className={`w-full text-left py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              Manage subscriptions
            </button>
            <button className="w-full text-left py-2 text-red-500">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;