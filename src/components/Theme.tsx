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
    const isThemeDark = JSON.parse(localStorage.getItem("isDark")!);

    if (localStorage.getItem("isDark")) {
      dispatch(setTheme(isThemeDark));

      if (!isThemeDark) body.current.classList.remove("dark");
      return;
    }

    dispatch(setTheme(true));
    localStorage.setItem("isDark", "true");
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
