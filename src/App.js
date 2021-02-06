import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Photo from "./Photo";
function App() {
  //const access_key = `-L7qL-z8HiLMFmAEsyOcjrk4lGxGC8hxfxHOLpohPP8`;
  const link = `https://api.unsplash.com/photos/?client_id=-L7qL-z8HiLMFmAEsyOcjrk4lGxGC8hxfxHOLpohPP8`;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const lastPhoto = useCallback((node) => {
    console.log("====", node);
    if (observer.current) observer.current.disconnet();
    observer.current = new IntersectionObserver((entry) => {});
    if (node) observer.current.observe(node);
  }, []);
  const fetchPhoto = async () => {
    setLoading(true);
    const response = await fetch(link);
    const data = await response.json();
    setPhotos(data);
    // console.log(photos);
    // console.log(data[0].urls.regular);
    setLoading(false);
  };
  useEffect(() => {
    fetchPhoto();
  }, []);
  return (
    <>
      <div className="photos">
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return (
              <div key={photo.id} ref={lastPhoto}>
                <Photo data={photo} />;
              </div>
            );
          } else {
            return <Photo key={photo.id} data={photo} />;
          }
        })}
      </div>
    </>
  );
}
export default App;
