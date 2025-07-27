import { List, MapIcon } from "../../assets/icons";
import { setSideMenuOpen } from "../../store/main";
import { useDispatch } from "react-redux";

const footer = ({ isMenuOpen = false, bgColor = "", border = "" }) => {
  const dispatch = useDispatch();
  return (
    <>
      {!isMenuOpen ? (
        <div
          className={`fixed bottom-0 xl:hidden md:hidden sm:flex w-full p-4 flex items-center justify-between ${bgColor} backdrop-blur-md border-t-[0.5px] ${border}`}
        >
          <span
            onClick={() => {
              dispatch(setSideMenuOpen(true));
            }}
          >
            <List />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default footer;
