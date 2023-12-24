/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { fetchPosts } from '../data/API'; // Import fetchPosts function

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('published_at');
  const [perPage, setPerPage] = useState(() => {
    const savedPerPage = parseInt(localStorage.getItem('perPage')) || 10;
    return savedPerPage;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(currentPage, perPage, sortBy);
        setPosts(data); // Set fetched posts to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, perPage, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when changing sorting
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    localStorage.setItem('perPage', newPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort By:
          </label>
          <select
            id="sort"
            className="border p-2 rounded"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="published_at">Oldest</option>
            <option value="-published_at">Newest</option>
          </select>
        </div>
        <div>
          <label htmlFor="perPage" className="mr-2">
            Items per Page:
          </label>
          <select
            id="perPage"
            className="border p-2 rounded"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <img
              src={post.small_image}
              alt="Thumbnail"
              className="w-full h-40 object-cover mb-2"
              loading="lazy"
            />
            <p className='text-lg font-small text-gray-600'>
              {post.published_at}
            </p>
            <h3 className="text-lg font-medium text-gray-800 truncate-3-lines">
              {post.title}
            </h3>
            {/* Display other post information */}
          </div>
        ))}
      </div>
      {/* Pagination */}
      {/* Implement pagination component or logic here */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListPost;
