import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link to={`/video/${video.id}`}>
        <div className="relative">
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* <img
              src={video.channel.profile_image_url}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
            /> */}
            <div>
              <h3 className="font-medium line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {video.channel.name}
              </p>
              <div className="flex text-gray-600 dark:text-gray-400 text-xs mt-1 space-x-2">
                <span>{video.view_count} views</span>
                <span>•</span>
                <span>{video.published_at}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;