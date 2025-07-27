import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useLiveTime } from "../../utils/useClock";

export const ListItem = ({
  item,
  onSelect,
  onDelete,
  currentlySwiped,
  setCurrentlySwiped,
  editMode,
  isActive,
}) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const itemRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setCurrentlySwiped(item.id);
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX < 0) {
      setOffsetX(Math.max(deltaX, -100));
    } else {
      setOffsetX(0);
    }
  };

  const handleTouchEnd = () => {
    if (offsetX < -30) {
      setIsSwiped(true);
      setOffsetX(-100);
    } else {
      setIsSwiped(false);
      setOffsetX(0);
    }
  };

  const handleDelete = () => onDelete(item.id);

  const handleClickOutside = (e) => {
    if (itemRef.current && !itemRef.current.contains(e.target)) {
      setIsSwiped(false);
      setOffsetX(0);
    }
  };

  const handleMinusClick = () => {
    setCurrentlySwiped(item.id);
    setIsSwiped(true);
    setOffsetX(-100);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (currentlySwiped !== null && currentlySwiped !== item.id) {
      setIsSwiped(false);
      setOffsetX(0);
    }
  }, [currentlySwiped, item.id]);

  const { shortTime, zone, offset, fullTimeDay } = useLiveTime(item?.timezone);

  return (
    <div
      ref={itemRef}
      className="relative overflow-visible rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence>
        {isSwiped && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full flex items-center bg-[rgb(255,66,69)] text-white font-bold z-10 rounded-xl"
          >
            <button onClick={handleDelete} className="w-20 h-full">
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start">
        <AnimatePresence>
          {editMode && (
            <motion.button
              key="minus"
              onClick={handleMinusClick}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-red-500 font-bold mt-2 mr-2 z-20"
              aria-label="Mark for delete"
            >
              −
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          className={`relative z-10 dark:bg-white/10 backdrop-brightness-110 backdrop-blur-md p-2.5 rounded-xl text-secondary dark:text-white text-xs leading-none flex flex-col gap-2.5 grow cursor-pointer ${
            isActive ? "border-2 border-blue" : "border-0"
          }`}
          animate={{
            x: offsetX,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => {
            onSelect(item.id);
          }}
        >
          <div className="w-full flex justify-between">
            <div className="w-full flex flex-col justify-between">
              <span className="text-lg font-semibold leading-none">
                {item.name}
              </span>
              <span className="leading-none">{item.country}</span>
            </div>
            <span className="leading-none text-4xl">{shortTime}</span>
          </div>

          <AnimatePresence>
            {!editMode && (
              <motion.div
                key="details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex justify-between text-light-grey-third dark:text-light-grey-second">
                  <span>{fullTimeDay}</span>
                  <div className="flex gap-1">
                    <span>{zone}</span>
                    <span>{offset}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export function List({ items, editMode, onSelect, onDelete }) {
  const [currentlySwiped, setCurrentlySwiped] = useState(null);
  const isActive = useSelector((state) => state?.main?.activeClock);

  const handleSelect = (item) => {
    onSelect?.(item);
  };

  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <ListItem
            item={item}
            onSelect={() => handleSelect(item)}
            onDelete={onDelete}
            isActive={isActive === item.id}
            currentlySwiped={currentlySwiped}
            setCurrentlySwiped={setCurrentlySwiped}
            editMode={editMode}
          />
        </div>
      ))}
    </>
  );
}
