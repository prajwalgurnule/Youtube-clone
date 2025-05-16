import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { motion } from 'framer-motion';
import { FiThumbsUp } from 'react-icons/fi';
import useVideos from '../hooks/useVideos';

const LikedVideos = () => {
  const [likedVideoIds, setLikedVideoIds] = useState([]);
  const { videos: allVideos, loading, error } = useVideos('https://apis.ccbp.in/videos');
  const [storageChange, setStorageChange] = useState(0); // Force re-render on storage change

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setStorageChange(prev => prev + 1);
    };

    window.addEventListener('storageUpdated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storageUpdated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load liked video IDs from localStorage
  useEffect(() => {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    setLikedVideoIds(likedVideos);
  }, [storageChange]);

  // Filter videos to only show liked ones
  const likedVideos = allVideos.filter(video => likedVideoIds.includes(video.id));

  // const handleUnlikeVideo = (videoId) => {
  //   const updatedVideos = likedVideoIds.filter(id => id !== videoId);
  //   localStorage.setItem('likedVideos', JSON.stringify(updatedVideos));
  //   setLikedVideoIds(updatedVideos);
    
  //   // Dispatch event to notify other components
  //   window.dispatchEvent(new Event('storageUpdated'));
  // };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <div className="p-3 mr-4 bg-blue-100 dark:bg-blue-900 rounded-full">
          <FiThumbsUp className="text-blue-600 dark:text-blue-300 text-xl" />
        </div>
        <h1 className="text-2xl font-bold">Liked Videos</h1>
      </div>
      
      {likedVideos.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {likedVideos.map((video) => (
            <motion.div 
              key={video.id}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <VideoCard video={video} />
              {/* <button
                onClick={() => handleUnlikeVideo(video.id)}
                className="absolute top-11 right-2 p-2 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-100 transition-all"
              >
                <FiTrash2 size={18} />
              </button> */}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <FiThumbsUp className="text-gray-400 dark:text-gray-500 text-3xl" />
          </div>
          <h2 className="text-xl font-medium">No liked videos</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Like videos to save them here
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LikedVideos;