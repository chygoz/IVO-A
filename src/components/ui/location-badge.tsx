import React from "react";

type SearchFilter = {
  q: string;
  l: string;
  c: string;
};

type LocationBadgeProps = {
  location: string;
  filter: SearchFilter;
  isCoordinates?: boolean;
  setFilter: React.Dispatch<React.SetStateAction<SearchFilter>>;
};

function LocationBadge({
  location,
  filter,
  isCoordinates,
  setFilter,
}: LocationBadgeProps) {
  function removeCity(city: string, index: number, state?: string) {
    if (index === 1) {
      setFilter({ ...filter, l: `${state},all` });
      return;
    }
    setFilter({ ...filter, l: "" });
  }
  if (isCoordinates)
    return (
      <div className="bg-green-500 rounded-md flex items-center gap-2 justify-center py-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        Using your location
      </div>
    );
  return (
    <div className="flex items-center gap-2">
      {location.split(",").map((city, index) => {
        if (city.toLowerCase() === "all") return null;
        return (
          <div
            key={index.toString()}
            className="bg-secondary-50 border border-solid text-sm border-secondary text-secondary w-fit rounded-md px-2 py-1 capitalize flex items-center gap-2"
          >
            {city}
            <button
              onClick={() => {
                if (index === 1) {
                  removeCity(city, index, location.split(",")[0]);
                  return;
                }

                removeCity(city, index);
              }}
              className="flex flex-col justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default LocationBadge;
