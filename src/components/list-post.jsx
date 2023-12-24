import { useState, useEffect } from 'react';
import { fetchPosts } from '../data/API'; // Import fetchPosts function

const ListPost = () => {
  const [allPosts, setAllPosts] = useState([]); 
  const [displayedPosts, setDisplayedPosts] = useState([]); 
  const [sortBy, setSortBy] = useState('published_at');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allData = await fetchPosts(1, 100); 
        if (allData && allData.length > 0) {
          setAllPosts(allData); 
          setDisplayedPosts(allData.slice(0, perPage)); 
          setTotalPages(Math.ceil(allData.length / perPage)); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Mendapatkan nilai dari localStorage saat komponen dimuat
    const savedPerPage = localStorage.getItem('perPage');
    const savedSortBy = localStorage.getItem('sortBy');

    if (savedPerPage) {
      setPerPage(parseInt(savedPerPage));
    }

    if (savedSortBy) {
      setSortBy(savedSortBy);
    }

    fetchAllPosts();
  }, [perPage]); 

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allData = await fetchPosts(1, 100, sortBy); // Menggunakan sortBy dari state
        if (allData && allData.length > 0) {
          setAllPosts(allData); 
          setDisplayedPosts(allData.slice(0, perPage)); 
          setTotalPages(Math.ceil(allData.length / perPage)); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllPosts();
  }, [perPage, sortBy]); 

  const handlePageChange = (page) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    setDisplayedPosts(allPosts.slice(startIndex, endIndex)); 
    setCurrentPage(page); 
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
  
    // Mengatur nilai sortBy sesuai pilihan pengguna
    if (selectedSort === 'published_at') {
      setSortBy('published_at');
    } else if (selectedSort === '-published_at') {
      setSortBy('-published_at');
    }
    
    // Menyimpan preferensi sorting ke localStorage
    localStorage.setItem('sortBy', selectedSort);
  };
  

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);

    setTotalPages(Math.ceil(allPosts.length / newPerPage)); 
    setCurrentPage(1); 
    setDisplayedPosts(allPosts.slice(0, newPerPage)); 

    // Menyimpan preferensi jumlah data per halaman ke localStorage
    localStorage.setItem('perPage', newPerPage);
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
            className="border p-2 rounded-full"
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
            className="border p-2 rounded-full"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedPosts.map((post) => (
          <div key={post.id} className="bg-white p-2 rounded shadow">
            {post.medium_image && post.medium_image[0] && post.medium_image[0].url && (
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

      <div className="flex justify-center mt-4 m-4">
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-orange text-white' : 'bg-gray-200 text-black'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPost;
