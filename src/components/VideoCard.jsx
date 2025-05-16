import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiClock, FiBookmark, FiThumbsUp } from 'react-icons/fi';
import { useState } from 'react';

const VideoCard = ({ video }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Check if video is saved or liked from localStorage on component mount
  useState(() => {
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    
    setIsSaved(savedVideos.includes(video.id));
    setIsLiked(likedVideos.includes(video.id));
  }, [video.id]);

  // Format view count
  const formatViews = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format publish date (simplified)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Today';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    let updatedVideos;
    
    if (isSaved) {
      updatedVideos = savedVideos.filter(id => id !== video.id);
    } else {
      updatedVideos = [...savedVideos, video.id];
    }
    
    localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));
    setIsSaved(!isSaved);
    setShowMenu(false);
    window.dispatchEvent(new Event('storageUpdated'));
  };

  const handleLikeVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    let updatedVideos;
    
    if (isLiked) {
      updatedVideos = likedVideos.filter(id => id !== video.id);
    } else {
      updatedVideos = [...likedVideos, video.id];
    }
    
    localStorage.setItem('likedVideos', JSON.stringify(updatedVideos));
    setIsLiked(!isLiked);
    setShowMenu(false);
    window.dispatchEvent(new Event('storageUpdated'));
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (showMenu && !e.target.closest('.menu-container')) {
      setShowMenu(false);
    }
  };

  // Add event listener for clicks outside the menu
  useState(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all relative"
    >
      <Link to={`/video/${video.id}`} className="block">
        {/* Thumbnail with duration badge */}
        <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <img
            src={video.thumbnail_url || 'https://via.placeholder.com/320x180'}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <FiClock className="mr-1" size={12} />
            {video.duration || '10:30'}
          </div>
          
          {/* Kebab menu button - moved to top right corner */}
          <div className="absolute top-2 right-2 menu-container z-20">
            <button 
              className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
              onClick={handleMenuClick}
            >
              <FiMoreVertical size={18} />
            </button>
            
            {/* Dropdown Menu - positioned absolutely and brought forward */}
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-700 rounded-md shadow-xl z-30 border border-gray-200 dark:border-gray-600"
              >
                <div className="py-1">
                  <button
                    onClick={handleSaveVideo}
                    className="flex items-center px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FiBookmark className="mr-3 text-lg" />
                    <div>
                      <div className="font-medium">{isSaved ? 'Remove from saved' : 'Save for later'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Add to your watch later list</div>
                    </div>
                  </button>
                  <button
                    onClick={handleLikeVideo}
                    className="flex items-center px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FiThumbsUp className="mr-3 text-lg" />
                    <div>
                      <div className="font-medium">{isLiked ? 'Remove like' : 'Like this video'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Show your appreciation</div>
                    </div>
                  </button>
                  {/* <button
                    className="flex items-center px-4 py-3 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FiThumbsDown className="mr-3 text-lg" />
                    <div>
                      <div className="font-medium">Not interested</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">We'll show fewer videos like this</div>
                    </div>
                  </button> */}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Video info */}
        <div className="p-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img
                src={video.channel?.profile_image_url || 'https://via.placeholder.com/40'}
                alt={video.channel?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm md:text-base line-clamp-2 leading-tight">
                {video.title}
              </h3>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                <p className="truncate">{video.channel?.name || 'Unknown Channel'}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span>{formatViews(video.view_count || 0)}</span>
                  <span>•</span>
                  <span>{formatDate(video.published_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;