import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageDisplay from "./ImageDisplay";
function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo`;

  const getApi = async () => {
    try {
      const response = await axios.get(API_URL);
      setImages(response.data.hits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      getApi();
    }
  }, [query]);

  return (
    <>
      <div className="w-full h-[10vh] flex]">
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <div className="w-full h-[100vh] flex justify-center items-center mt-[100vh]">
        <ImageDisplay images={images} />
      </div>
    </>
  );
}

export default App;
