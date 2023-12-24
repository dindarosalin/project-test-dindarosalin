/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchIdeas } from "../data/API"; // Ubah lokasi file API.js sesuai dengan struktur proyek Anda

const CardComponent = ({ idea }) => {
  return (
    <div className="">
      <div className="border rounded p-4 mb-4 h-[400px] overflow-hidden">
        <img
          src={idea.medium_image} // URL gambar kecil
          alt={idea.title}
          loading="lazy"
          className="w-full h-auto mt-4" // Atur lebar sesuai kebutuhan
        />
        <h2 className="text-lg font-semibold h-12 overflow-hidden line-clamp-3">
          {idea.title}
        </h2>
        <div className="text-gray-600 line-clamp-3">
        {idea.content}
        </div>
        {/* Tambahkan elemen lain sesuai kebutuhan */}
      </div>
    </div>
  );
};

const CardList = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIdeas({
          page: 1,
          size: 10,
          append: ["small_image"],
          sort: "published_at",
        });
        setIdeas(data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:px-[72px]">
      {ideas.map((idea) => (
        <CardComponent key={idea.id} idea={idea} />
      ))}
    </div>
  );
};

export default CardList;
