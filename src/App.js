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
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        addImage();
      },
      { threshol: 1 }
    );
  }, []);
  const [element, setElement] = useState(null);
  useEffect(() => {
    const currentElement = element;
    const currentOvserver = observer.current;
    if (currentElement) {
      currentOvserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentOvserver.unobserve(currentElement);
      }
    };
  }, [element]);

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
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      console.log("add image");
    } else {
      console.log("hey this is loading");
    }
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
      <div ref={setElement}> </div>
      {loading && <h2 c>Loading...</h2>}
    </>
  );
}
export default App;
