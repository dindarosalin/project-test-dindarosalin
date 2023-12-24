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

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(currentPage, perPage, sortBy);
        setPosts(data); // Set fetched posts to state
        if (data.meta && data.meta.total_pages) {
          setTotalPages(data.meta.total_pages); // Set total pages
        } else {
          setTotalPages(0); // Set total pages to 0 or any default value
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, perPage, sortBy]);

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
            {post.medium_image && post.medium_image.length > 0 && post.medium_image[0].url && (
              <img
                src={post.medium_image[0].url}
                alt="Thumbnail"
                className="w-full h-64 object-cover mb-2"
                loading="lazy"
              />
            )}
            <p className='text-lg font-small text-gray-600'>
              {post.published_at}
            </p>
            <h3 className="text-lg font-medium text-gray-800 truncate-3-lines">
              {post.title}
            </h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
            >
              Prev
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPost;
