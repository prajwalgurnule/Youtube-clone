import useVideos from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

const Trending = () => {
  const { videos, loading, error } = useVideos(
    'https://apis.ccbp.in/videos/trending'
  );

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Trending Videos</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;