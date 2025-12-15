import LoadingSpinner from "./loading-spinner";

// components/Loader.js
const MapLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "centre",
      alignItems: "centre",
      height: "300px",
    }}
  >
    <LoadingSpinner />
  </div>
);

export default MapLoader;
