import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useVideos from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import Loader from '../components/Loader';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

  const { videos, loading, error } = useVideos(
    'https://apis.ccbp.in/videos/all',
    { search: searchQuery }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchInput });
  };

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 pl-10 rounded-full border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="absolute left-3 top-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {searchQuery ? `Results for "${searchQuery}"` : 'Recommended Videos'}
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

export default Home;