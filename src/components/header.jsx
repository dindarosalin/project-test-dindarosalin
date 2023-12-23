import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { navLink } from "../data/dummy";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScroll ? " h-[60px] lg:-top-[60px]" : "h-[80px]"
      } lg:px-[72px] px-5 w-full z-[10] text-white fixed transition-all duration-300 ease-in-out flex justify-between items-center bg-indigo-600`}
    >
      <div className="text-xl">
        LOGO
      </div>
      <div className="flex items-center gap-x-3 md:hidden">
        <FiMenu
          size={24}
          onClick={() => setNav((prev) => !prev)}
          className="block"
        />
      </div>
      <ul className="hidden md:flex gap-5 items-end ml-auto">
        {navLink.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              className={`${
                isScroll ? "text-[14px]" : "text-[18px]"
              } hover:text-black transition duration-300 ease-in-out hover:cursor-pointer`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={`${
          nav ? "right-0" : "-right-full"
        } w-full bg-indigo-600 absolute top-0 p-10 block md:hidden`}
      >
        <AiOutlineClose
          className="text-2xl mb-3"
          onClick={() => setNav((prev) => !prev)}
        />
        <ul>
          {navLink.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className="py-2 hover:text-white transition duration-300 ease-in-out border-b-2 z-[20]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
