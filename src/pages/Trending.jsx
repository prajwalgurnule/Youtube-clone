import useVideos from '../hooks/useVideos';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

const Trending = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { videos, loading, error } = useVideos(
    'https://apis.ccbp.in/videos/trending',{ search: searchQuery }
  );

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

 return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">
        {searchQuery ? `Results for "${searchQuery}"` : 'Trending Vedios'}
      </h1>

      {loading ? (
        <Loader />
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium">No videos found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
};

export default Trending;