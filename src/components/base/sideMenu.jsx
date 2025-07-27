import { Sidemenu } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  setActiveClock,
  setLocation,
  setSideMenuOpen,
  setTimezone,
  updateLocation,
} from "../../store/main";
import { SearchInput, SearchList } from ".";
import { useResolution } from "../../utils/useResolution";
import { useSelectedItembyClick } from "../../utils/useSelectedItemByClick";
import data from "../../data/data.json";
import { List } from "./List";
import { useState } from "react";
import { fetchBoundry } from "../../store/clock";

export default function sideMenu({
  className = "",
  loading = false,
  listData = [],
}) {
  const searchValue = useSelector((state) => state.main.searchValue);
  const isSearchPanelOpen = useSelector(
    (state) => state.main.isSearchPanelOpen
  );
  const searchResultValue = useSelector(
    (state) => state.main.searchResultValue
  );

  const dispatch = useDispatch();

  const screenWidth = useResolution();
  const isMobileScreen = screenWidth < 768;

  const [isEditList, setIsEditList] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteLocation(id));
  };

  const handleSelect = (item) => {
    dispatch(setLocation(item));
    dispatch(updateLocation(item));
    dispatch(setTimezone(item?.timezone));
    dispatch(fetchBoundry(item?.osm_id, item?.osm_type));
    dispatch(setActiveClock(item.id));
  };

  return (
    <div
      className={`${className} sticky w-full h-full max-h-screen overflow-auto flex flex-col gap-4 bg-light-menu/90 dark:bg-dark-bg backdrop-blur-md text-white shadow-md`}
    >
      <div
        className={`sticky top-0 z-20 w-full flex flex-col gap-4 p-6 bg-light-menu/90 dark:bg-dark-bg backdrop-blur-md`}
      >
        <div className="flex items-center justify-between">
          <span
            className="w-fit cursor-pointer"
            onClick={() => {
              dispatch(setSideMenuOpen(false));
            }}
          >
            <Sidemenu />
          </span>

          {listData?.length > 0 ? (
            <span
              className="w-fit cursor-pointer text-blue"
              onClick={() => {
                setIsEditList(!isEditList);
              }}
            >
              {isEditList ? "Done" : "Edit List"}
            </span>
          ) : null}
        </div>
        <span
          className={`flex font-sans font-semibold text-3xl text-secondary dark:text-light-white pr-6`}
        >
          {data.app}
        </span>
        <SearchInput className="relative w-full sm:flex md:flex items-center xl:hidden" />
      </div>

      <div className="z-10 flex flex-col gap-4 p-6 pt-0">
        {searchValue?.length > 0 && isSearchPanelOpen && isMobileScreen ? (
          <SearchList
            className="p-0 shadow-none"
            value={searchValue}
            result={searchResultValue}
            loading={loading}
            onClick={(place) => {
              useSelectedItembyClick(place, dispatch);
              dispatch(setSideMenuOpen(false));
            }}
          />
        ) : null}

        <div className="flex flex-col gap-2.5">
          <List
            items={listData}
            editMode={isEditList}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
