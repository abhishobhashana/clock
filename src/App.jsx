import "./index.css";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import Home from "./pages/home";

export default function App() {
  return (
    <div className="bg-light-bg dark:bg-default min-h-screen h-dvh max-w-8xl mx-auto font-sans text-base md:text-[17px] sm:text-[17px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
