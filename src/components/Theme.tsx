import sun from "/images/icon-sun.svg";
import moon from "/images/icon-moon.svg";
import { useSelector, useDispatch } from "react-redux";
import { themeSelector, toggleTheme, setTheme } from "../store";
import { useEffect, useRef } from "react";

const Theme = () => {
  const body = useRef(document.querySelector(":root") as HTMLElement);
  const { value: isDark } = useSelector(themeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme")!) || undefined;

    if (!theme) return;

    if (theme) {
      dispatch(setTheme(theme));
      body.current.classList.add("dark");
    }
  }, []);

  return (
    <div
      onClick={() => {
        dispatch(toggleTheme());
        body.current.classList.toggle("dark");
      }}
      className="w-fit cursor-pointer"
    >
      {isDark ? (
        <img src={sun} alt="sun image" className="max-w-5" />
      ) : (
        <img src={moon} alt="moon image" className="max-w-5" />
      )}
    </div>
  );
};

export default Theme;
