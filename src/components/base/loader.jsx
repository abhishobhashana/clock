export default function Loader({ className = "" }) {
  return (
    <div
      className={`${className} spinner relative inline-block w-10 h-10 rounded-lg p-5`}
    >
      {Array.from({ length: 8 }).map((_, index) => {
        const rotation = index * 45;
        const delay = -0.8 + index * 0.12;
        return (
          <div
            key={index}
            className={`absolute w-[9%] h-[25%] bg-light-grey-second rounded-full opacity-0 animate-fade`}
            style={{
              transform: `rotate(${rotation}deg) translate(0, -100%)`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
