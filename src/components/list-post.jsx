import { useEffect, useState } from "react";
import { fetchPosts } from "../data/API"; // Ganti sesuai dengan lokasi API Anda

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('latest'); // Atur default sort by
  const [perPage, setPerPage] = useState(10); // Atur default posts per page
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts({ sortBy, perPage, page });
        setPosts(data?.posts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sortBy, perPage, page]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1); // Reset to first page when changing sort
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setPage(1); // Reset to first page when changing posts per page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          Sort by:
          <button
            onClick={() => handleSortChange('latest')}
            className={`mx-2 border px-3 py-1 rounded ${
              sortBy === 'latest' ? 'bg-gray-300' : ''
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortChange('oldest')}
            className={`mx-2 border px-3 py-1 rounded ${
              sortBy === 'oldest' ? 'bg-gray-300' : ''
            }`}
          >
            Oldest
          </button>
        </div>
        <div>
          Show per page:
          <select
            value={perPage}
            onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
            className="mx-2 border px-3 py-1 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            {/* Tambahkan elemen lain sesuai kebutuhan */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPosts;
