import React, {
  //
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Photo from "./Photo";
function App() {
  //const access_key = `-L7qL-z8HiLMFmAEsyOcjrk4lGxGC8hxfxHOLpohPP8`;
  const url = `https://api.unsplash.com/photos/?client_id=-L7qL-z8HiLMFmAEsyOcjrk4lGxGC8hxfxHOLpohPP8&page=`;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhoto = async () => {
    setLoading(true);
    const link = url + page;
    console.log("page", page);
    const response = await fetch(link);
    const data = await response.json();
    const newdata = [...photos, ...data];
    setPhotos(newdata);
    setLoading(false);
  };
  useEffect(() => {
    fetchPhoto();
  }, [page]);

  const addImage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="photos">
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return (
              <div key={photo.id}>
                <Photo data={photo} />
              </div>
            );
          } else {
            return <Photo key={photo.id} data={photo} />;
          }
        })}
      </div>
      <button type="submit" onClick={addImage}>
        Add next batch
      </button>
    </>
  );
}
export default App;
