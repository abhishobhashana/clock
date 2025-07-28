import { useDispatch, useSelector } from "react-redux";
import { Box, ClockSvg, Footer, Header, Loader, SearchList } from "./base";
import {
  setAddBtn,
  setClockListByLocations,
  setSideMenuOpen,
} from "../store/main";
import { useSelectedItembyClick } from "../utils/useSelectedItemByClick";
import { useWidgetContainerHeight } from "../utils/useWidgetContainerHeight";
import { useResolution } from "../utils/useResolution";
import data from "../data/data.json";
import { useEffect, useState } from "react";
import { Clock, MapIcon } from "../assets/icons";
import { useLiveTime } from "../utils/useClock";
import { Maps } from "./map";
import { fetchFailure } from "../store/clock";
import { motion } from "framer-motion";

export default function clockContainer({
  isMenuOpen = false,
  showAddBtn = false,
  searchValue = "",
  searchResultValue = "",
  isSearchPanelOpen = false,
  loading = false,
  location = "",
  mapData = [],
  timezone = "",
}) {
  const addLocationData = useSelector((state) => state?.clock?.addLocationData);
  const dispatch = useDispatch();

  const screenWidth = useResolution();
  const widgetContainerHeight = useWidgetContainerHeight();

  const isTabScreen = screenWidth >= 768 && screenWidth < 1024;

  useEffect(() => {
    dispatch(fetchFailure());
    dispatch(setAddBtn(false));
  }, []);

  const [addBtnText, setAddBtnText] = useState("Add");

  const { time, zone, offset, fullTimeDay } = useLiveTime(timezone);

  const popOutAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <>
      <div
        className={
          isMenuOpen
            ? "xl:col-span-4 md:col-span-3 md:col-start-3 xl:grid md:grid sm:hidden relative bg-cover"
            : "col-span-1 relative bg-cover"
        }
      >
        <Header
          className={isMenuOpen ? "w-[80%]" : "w-full"}
          isMenuOpen={isMenuOpen}
          showAddBtn={showAddBtn}
        />

        {searchValue?.length > 0 && isSearchPanelOpen && isTabScreen ? (
          <SearchList
            className="px-5 py-5"
            value={searchValue}
            result={searchResultValue}
            loading={loading}
            onClick={(place) => useSelectedItembyClick(place, dispatch)}
          />
        ) : loading ? (
          <div className="flex items-center justify-center h-screen w-full">
            <Loader className="!p-3 !w-8 !h-8" />
          </div>
        ) : timezone ? (
          <>
            {showAddBtn ? (
              <div className="z-20 w-full lg:hidden md:flex sm:flex items-center justify-between px-4 py-2">
                <span
                  className="pl-2 text-white"
                  onClick={() => {
                    dispatch(setSideMenuOpen(true));
                    dispatch(setAddBtn(false));
                  }}
                >
                  {data?.cancel}
                </span>

                <span
                  className="text-white"
                  onClick={() => {
                    dispatch(setClockListByLocations(addLocationData));
                    setAddBtnText("Added");
                    setTimeout(() => {
                      dispatch(setAddBtn(false));
                      setAddBtnText("Add");
                    }, 400);
                  }}
                >
                  {addBtnText}
                </span>
              </div>
            ) : null}

            <motion.div
              variants={popOutAnimation}
              initial="hidden"
              animate="visible"
              className="w-full flex justify-center xl:h-full md:h-full"
            >
              <div
                className={`z-10 w-full flex flex-col gap-6 xl:p-24 md:p-12 sm:p-6 sm:pt-10 sm:pb-0 pb-0 items-center justify-center ${
                  isMenuOpen ? "sm:hidden xl:flex md:flex" : ""
                }`}
              >
                {/* Title */}
                <div className="flex items-end gap-1.5 font-semibold text-2xl">
                  <span className="text-secondary dark:text-white">
                    {location?.name}
                  </span>

                  <span className="text-light-grey-third">
                    {location?.country}
                  </span>
                </div>

                {/* Widgets */}
                <div
                  className="w-full overflow-auto hide-scroll"
                  style={{
                    height: isTabScreen ? "auto" : widgetContainerHeight,
                  }}
                >
                  <div
                    className={`w-full h-full grid gap-6 text-light-grey-third ${
                      isMenuOpen
                        ? "sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-1 md:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2"
                        : "sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2 xl:grid-cols-3 xl:grid-rows-2"
                    }`}
                  >
                    {/* Time */}
                    <div
                      className={`sm:col-span-1 sm:row-span-1 ${
                        isMenuOpen
                          ? "md:col-span-1 md:row-span-1"
                          : "md:col-span-1 md:row-span-1"
                      } xl:col-span-1 xl:row-span-1`}
                    >
                      <Box icon={<Clock />} title="TIME">
                        <div className="h-full flex flex-col justify-evenly bg-white/90 dark:bg-dark-bg/90 rounded-b-xl p-4 pt-0">
                          <span className="text-light-grey-second">
                            {zone} {offset}
                          </span>
                          <span className="text-4xl text-secondary dark:text-white">
                            {time}
                          </span>
                          <span className="text-light-grey-second">
                            {fullTimeDay}
                          </span>
                        </div>
                      </Box>
                    </div>

                    {/* Clock */}
                    <div
                      className={`sm:col-span-1 sm:row-span-1 ${
                        isMenuOpen
                          ? "md:col-span-1 md:row-span-1 md:row-start-2"
                          : "md:col-span-1 md:row-span-1 md:row-start-2"
                      } xl:col-span-1 xl:row-span-1 xl:row-start-2`}
                    >
                      <Box icon={<Clock />} title="CLOCK">
                        <div className="xl:h-full md:h-full sm:h-auto flex flex-col gap-1 bg-white/90 dark:bg-dark-bg/90 rounded-b-xl p-4 pt-0 items-center justify-center">
                          <ClockSvg width={180} height={180} time={time} />
                        </div>
                      </Box>
                    </div>

                    {/* Map */}
                    <div
                      className={`sm:col-span-1 sm:row-span-1 xl:mt-0 md:mt-0 sm:mt-24 ${
                        isMenuOpen
                          ? "md:col-span-1 md:row-span-1 md:row-start-3"
                          : "md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-1"
                      } xl:col-span-2 xl:row-span-2 xl:col-start-2 xl:row-start-1`}
                    >
                      <Box icon={<MapIcon />} title="MAP">
                        <div className="xl:h-full md:h-full sm:h-[18rem] flex flex-col gap-1 bg-white/90 dark:bg-dark-bg/90 rounded-b-xl p-4 pt-0">
                          <Maps location={location} mapData={mapData} />
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <span className="h-full w-full flex items-center justify-center text-center font-semibold text-4xl text-white p-4">
            {data.noLocation}
          </span>
        )}

        <Footer isMenuOpen={isMenuOpen} />
      </div>
    </>
  );
}
