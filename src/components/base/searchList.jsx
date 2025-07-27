import Loader from "./loader";
import { useSelector } from "react-redux";
import data from "../../data/data.json";

function SearchList({
  className = "",
  value = "",
  result = [],
  loading = false,
  onClick = () => {},
}) {
  const isSearchPanelOpen = useSelector(
    (state) => state.main.isSearchPanelOpen
  );
  const hasInput = value.length > 0;

  const containerClasses = `${className} xl:bg-light-bg/90 xl:dark:bg-dark-bg/90 backdrop-blur-md xl:min-w-max md:min-w-full w-full text-white xl:shadow-lg xl:rounded-xl p-1 xl:border border-seperator dark:border-dark-seperator`;

  if (!hasInput) return null;

  return (
    <>
      {isSearchPanelOpen ? (
        <div className={containerClasses}>
          {loading ? (
            <div className="flex items-center justify-center h-40 w-full">
              <Loader className="!p-3 !w-8 !h-8" />
            </div>
          ) : result?.length > 0 ? (
            <div className="w-full">
              <span className="xl:px-4 md:px-4 sm:px-0 xl:text-xs text-sm text-light-grey-second">
                {data.searchRecents}
              </span>
              {result.map((place, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg xl:hover:bg-blue cursor-pointer"
                  onClick={() => onClick(place)}
                >
                  <span className="w-full flex xl:px-4 md:px-4 sm:px-0 xl:py-1 md:py-2 sm:py-2 xl:text-sm text-base text-secondary dark:text-white hover:text-white">
                    {place?.display_name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="w-full flex justify-center p-4 xl:text-sm text-base text-center">
              {data.noResultFound}
            </span>
          )}
        </div>
      ) : null}
    </>
  );
}

export default SearchList;
