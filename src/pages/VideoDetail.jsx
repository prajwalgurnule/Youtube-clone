import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchVideo();
  }, [id]);

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
          <div className="flex items-center justify-between mb-4">
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
            <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
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
        </div>

        <div className="w-full md:w-80 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
          {/* In a real app, you would fetch recommended videos */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-40 h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div>
                  <h3 className="font-medium line-clamp-2">
                    Recommended video {i}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Channel name
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;