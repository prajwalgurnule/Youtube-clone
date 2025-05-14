import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

const SavedVideos = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch saved videos from an API or local storage
    const mockSavedVideos = [
      {
        id: '1',
        title: 'Schwag shares his batting experience in IB Cricket',
        thumbnail_url: 'https://via.placeholder.com/300x200',
        channel: {
          name: 'SCHWAG',
          profile_image_url: 'https://via.placeholder.com/50x50',
        },
        view_count: '1.2M views',
        published_at: '2 weeks ago',
        duration: '10:30',
      },
      {
        id: '2',
        title: 'Yellow Strikers are Ready to Strike Big',
        thumbnail_url: 'https://via.placeholder.com/300x200',
        channel: {
          name: 'YELLOW STRIKERS',
          profile_image_url: 'https://via.placeholder.com/50x50',
        },
        view_count: '850K views',
        published_at: '3 days ago',
        duration: '8:45',
      },
    ];
    setSavedVideos(mockSavedVideos);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Videos</h1>
      {savedVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">No saved videos</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Save videos to watch later
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedVideos;