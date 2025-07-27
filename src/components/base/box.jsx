export default function box({ icon = <></>, title = "", children }) {
  return (
    <div className="w-full h-full flex flex-col">
      <span
        className={`sticky top-0 flex gap-2 items-center px-4 py-3 text-sm bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md rounded-t-xl z-10`}
      >
        {icon}
        {title}
      </span>

      {children}
    </div>
  );
}
