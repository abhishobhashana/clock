import { useEffect, useRef, useState } from "react";
import { CloseCircle, Search } from "../../assets/icons";
import { SearchList } from ".";
import { useDispatch } from "react-redux";
import {
  setAddBtn,
  setSearchPanelOpen,
  setSearchResultState,
  setSearchValueState,
} from "../../store/main";
import { useSelectedItembyClick } from "../../utils/useSelectedItemByClick";

export const searchInput = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceSearch = debounce(async (value) => {
    if (value.length) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?&addressdetails=1&q=${value}&format=json&limit=9`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const filteredData = data?.filter((place) =>
            place?.name?.toLowerCase().includes(value.toLowerCase())
          );

          setTimeout(() => {
            if (filteredData.length > 0) {
              setSearchResult(filteredData);
              dispatch(setSearchResultState(filteredData));
              setIsSearchEmpty(false);
            } else {
              setSearchResult([]);
              dispatch(setSearchResultState([]));
              setIsSearchEmpty(true);
            }
            setLoading(false);
          }, 500);
        } else {
          console.warn(response.statusText);
        }
      } catch (e) {
        console.warn("Error found", e);
        setLoading(false);
      }
    } else {
      setSearchResult([]);
      dispatch(setSearchResultState([]));
      setIsSearchEmpty(false);
      setLoading(false);
    }
  }, 300);

  const onSearchChange = (value) => {
    dispatch(setSearchPanelOpen(true));
    dispatch(setSearchValueState(value));
    setSearchValue(value);
    if (value.length >= 1) {
      debounceSearch(value);
    } else {
      debounceSearch(null);
    }
  };

  useEffect(() => {
    dispatch(setSearchValueState(""));
    dispatch(setSearchResultState([]));
    dispatch(setSearchPanelOpen(false));
  }, []);

  return (
    <>
      <div className={`${className} relative`}>
        <span className="z-[1] absolute ml-2 pointer-events-none">
          <Search />
        </span>

        {searchValue.length ? (
          <span
            className="z-[1] absolute right-2 cursor-pointer"
            onClick={() => {
              dispatch(setSearchValueState(""));
              setSearchValue("");
              setSearchResult([]);
              dispatch(setSearchResultState([]));
              dispatch(setSearchPanelOpen(true));
              dispatch(setAddBtn(false));
              inputRef.current.focus();
            }}
          >
            <CloseCircle input />
          </span>
        ) : null}

        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          autoComplete="off"
          aria-label="Search"
          className={`w-full flex items-center bg-light-white-second brightness-95 dark:bg-secondary text-secondary dark:text-white text-base p-1.5 pl-8 rounded-lg focus:outline-none focus:ring focus:ring-blue`}
          spellCheck="false"
          value={searchValue}
          onClick={() => {
            if (searchValue?.length > 0) {
              dispatch(setSearchPanelOpen(true));
            }
          }}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <SearchList
          className="absolute top-10 right-0 xl:flex md:hidden sm:hidden"
          value={searchValue}
          result={searchResult}
          loading={loading}
          onClick={(place) => useSelectedItembyClick(place, dispatch)}
        />
      </div>
    </>
  );
};

export default searchInput;
