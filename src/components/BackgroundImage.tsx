import mobileLightImage from "/images/bg-mobile-light.jpg";
import mobileDarkImage from "/images/bg-mobile-dark.jpg";
import desktopLightImage from "/images/bg-desktop-light.jpg";
import desktopDarkImage from "/images/bg-desktop-dark.jpg";

import { useSelector } from "react-redux";
import { themeSelector } from "../store";

const BackgroundImage = () => {
  const { value: isDark } = useSelector(themeSelector);
  return (
    <>
      {isDark ? (
        <>
          <img
            src={mobileDarkImage}
            alt="background image"
            className="md:hidden w-full absolute max-h-[200px] -z-50"
          />
          <img
            src={desktopDarkImage}
            alt="background image"
            className="hidden md:block w-full absolute max-h-[300px] -z-50"
          />
        </>
      ) : (
        <>
          <img
            src={mobileLightImage}
            alt="background image"
            className="md:hidden absolute w-full max-h-[200px] -z-50"
          />
          <img
            src={desktopLightImage}
            alt="background image"
            className="hidden md:block absolute w-full max-h-[300px] -z-50"
          />
        </>
      )}
    </>
  );
};

export default BackgroundImage;
