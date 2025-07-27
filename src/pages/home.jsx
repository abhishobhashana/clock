import { motion } from "framer-motion";
import { SideMenu } from "../components/base";
import { useDispatch, useSelector } from "react-redux";
import ClockContainer from "../components/clockContainer";
import { useEffect } from "react";
import { setActiveClock, setLocation } from "../store/main";
import { fetchBoundry } from "../store/clock";

const Home = () => {
  const isMenuOpen = useSelector((state) => state.main.isSideMenuOpen);
  const searchValue = useSelector((state) => state.main.searchValue);
  const isSearchPanelOpen = useSelector(
    (state) => state.main.isSearchPanelOpen
  );
  const searchResultValue = useSelector(
    (state) => state.main.searchResultValue
  );
  const timezone = useSelector((state) => state?.main?.timezone);
  const showAddBtn = useSelector((state) => state?.main?.showAddBtn);
  const location = useSelector((state) => state?.main?.location);
  const loading = useSelector((state) => state?.clock?.loading);
  const mapData = useSelector((state) => state?.clock?.data);

  const clockListByLocations = useSelector(
    (state) => state?.main?.clockListByLocations
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (clockListByLocations?.length) {
      const item = clockListByLocations[clockListByLocations.length - 1];
      dispatch(setActiveClock(clockListByLocations.length));
      dispatch(fetchBoundry(item?.osm_id, item?.osm_type));
      dispatch(setLocation(item));
    }
  }, []);

  return (
    <div
      className={`grid ${
        isMenuOpen ? "grid-cols-5" : "grid-cols-1"
      } h-screen w-full overflow-hidden`}
    >
      {isMenuOpen && (
        <motion.div
          className="sm:col-span-5 md:col-span-2 xl:col-span-1"
          initial={{ x: "-10%" }}
          animate={{ x: isMenuOpen ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <SideMenu loading={loading} listData={clockListByLocations} />
        </motion.div>
      )}

      <ClockContainer
        loading={loading}
        location={location}
        mapData={mapData}
        isMenuOpen={isMenuOpen}
        showAddBtn={showAddBtn}
        searchValue={searchValue}
        searchResultValue={searchResultValue}
        isSearchPanelOpen={isSearchPanelOpen}
        timezone={timezone}
      />
    </div>
  );
};

export default Home;
