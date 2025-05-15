import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {  FiThumbsDown } from 'react-icons/fi';
import VideoCard from '../components/VideoCard';
import CommentsSection from '../components/CommentsSection';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Load saved and liked status from localStorage
  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    setIsSaved(savedVideos.includes(id));
    setIsLiked(likedVideos.includes(id));
  }, [id]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`https://apis.ccbp.in/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideo(response.data.video_details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const response = await axios.get('https://apis.ccbp.in/videos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredVideos = response.data.videos
        .filter(v => v.id !== id)
        .slice(0, 5);
      setRelatedVideos(filteredVideos);
    } catch (err) {
      setRelatedError(err.message);
    } finally {
      setRelatedLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchRelatedVideos();
  }, [id]);

  const handleSaveVideo = () => {
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    let updatedVideos;
    
    if (isSaved) {
      updatedVideos = savedVideos.filter(videoId => videoId !== id);
    } else {
      updatedVideos = [...savedVideos, id];
    }
    
    localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));
    setIsSaved(!isSaved);
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('storageUpdated'));
  };

  const handleLikeVideo = () => {
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    let updatedVideos;
    
    if (isLiked) {
      updatedVideos = likedVideos.filter(videoId => videoId !== id);
    } else {
      updatedVideos = [...likedVideos, id];
      if (isDisliked) {
        setIsDisliked(false);
      }
    }
    
    localStorage.setItem('likedVideos', JSON.stringify(updatedVideos));
    setIsLiked(!isLiked);
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('storageUpdated'));
  };

  const handleDislikeVideo = () => {
    if (isLiked) {
      const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');
      const updatedVideos = likedVideos.filter(videoId => videoId !== id);
      localStorage.setItem('likedVideos', JSON.stringify(updatedVideos));
      setIsLiked(false);
    }
    setIsDisliked(!isDisliked);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!video) return <div className="p-4">Video not found</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${video.video_url.split('v=')[1]}`}
            title={video.title}
            allowFullScreen
            className="w-full h-96"
          ></iframe>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={video.channel.profile_image_url}
                alt={video.channel.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{video.channel.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {video.channel.subscriber_count} subscribers
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <button 
                onClick={handleLikeVideo}
                className={`flex items-center px-3 py-2 rounded-full ${isLiked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {isLiked ? 'Liked' : 'Like'}
              </button>
              
              <button 
                onClick={handleDislikeVideo}
                className={`flex items-center px-3 py-2 rounded-full ${isDisliked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v9m0-9h2.765a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 13H9" />
                </svg> */}
                <FiThumbsDown size={18} />
                Dislike
              </button>
              
              <button 
                onClick={handleSaveVideo}
                className={`flex items-center px-3 py-2 rounded-full ${isSaved ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {isSaved ? 'Saved' : 'Save'}
              </button>
              
              <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-gray-600 dark:text-gray-300">
                {video.view_count} views
              </span>
              <span className="text-gray-600 dark:text-gray-300">•</span>
              <span className="text-gray-600 dark:text-gray-300">
                {video.published_at}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              {video.description}
            </p>
          </div>

          <CommentsSection videoId={id} />
        </div>

        <div className="w-full md:w-80 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Related Videos</h2>
          
          {relatedLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : relatedError ? (
            <div className="text-red-500 text-sm">{relatedError}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {relatedVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <VideoCard video={video} compact />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;