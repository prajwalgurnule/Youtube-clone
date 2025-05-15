import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiClock } from 'react-icons/fi';

const VideoCard = ({ video }) => {
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

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all "
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
            <button 
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle menu click
              }}
            >
              <FiMoreVertical size={18} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;