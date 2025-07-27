import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from ".";
import {
  setAddBtn,
  setSideMenuOpen,
  setClockListByLocations,
} from "../../store/main";
import { Plus, Sidemenu } from "../../assets/icons";

export default function Header({
  className = "",
  isMenuOpen = false,
  showAddBtn = false,
}) {
  const addLocationData = useSelector((state) => state?.clock?.addLocationData);
  const dispatch = useDispatch();

  const [addBtnText, setAddBtnText] = useState("Add");

  useEffect(() => {
    dispatch(setAddBtn(false));
  }, []);

  return (
    <div
      className={`${className} z-20 fixed hidden lg:flex md:flex font-sans items-center justify-between p-3 pl-5 bg-transparent`}
    >
      <div className="flex items-center gap-5">
        <span
          className={`${isMenuOpen ? "hidden" : ""} cursor-pointer`}
          title="open sidemenu"
          onClick={() => {
            dispatch(setSideMenuOpen(true));
          }}
        >
          <Sidemenu />
        </span>
      </div>

      <div className="hidden xl:flex gap-2.5">
        {showAddBtn ? (
          <button
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg shadow-md bg-light-grey dark:bg-secondary text-base`}
            onClick={() => {
              dispatch(setClockListByLocations(addLocationData));
              setAddBtnText("Added");
              setTimeout(() => {
                dispatch(setAddBtn(false));
                setAddBtnText("Add");
              }, 400);
            }}
          >
            <Plus />
            <span className="text-white">{addBtnText}</span>
          </button>
        ) : null}

        <SearchInput className="relative xl:flex items-center md:hidden" />
      </div>
    </div>
  );
}
