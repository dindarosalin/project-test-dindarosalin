/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchIdeas } from "../data/API"; // Ubah lokasi file API.js sesuai dengan struktur proyek Anda

const CardComponent = ({ idea }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-semibold">{idea.title}</h2>
      <p className="text-gray-600">{idea.content}</p>
      {/* Tambahkan elemen lain sesuai kebutuhan */}
    </div>
  );
};

const CardList = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIdeas();
        setIdeas(data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <div>
        {ideas.map((idea) => (
          <CardComponent key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
