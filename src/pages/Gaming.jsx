import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU';

const Gaming = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGamingVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://apis.ccbp.in/videos/gaming', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Process videos to ensure they have all required fields
        const processedVideos = (response.data.videos || []).map(video => ({
          ...video,
          id: video.id || Math.random().toString(36).substring(2, 9),
          views: video.view_count || '0 views',
          timestamp: video.published_at || 'Recently',
          channel: video.channel || {
            name: 'Unknown Channel',
            profile_image_url: 'https://via.placeholder.com/48'
          }
        }));
        
        setVideos(processedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gaming videos:', err);
        setError('Failed to load gaming videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchGamingVideos();
  }, []);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please try Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      navigate(`/search?q=${encodeURIComponent(transcript)}`);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center mt-8">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      
      <h1 className="text-2xl font-bold mb-6">Gaming Videos</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600">No gaming videos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard 
              key={video.id} 
              video={video}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gaming;