import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLink } from "../data/dummy";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import './style/header.css';

const Header = () => {
  const [nav, setNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScroll ? "h-[60px] lg:-top-[60px] bg-opacity-75" : "h-[80px]"
      } lg:px-[72px] px-5 w-full z-[10] text-white fixed transition-all duration-300 ease-in-out flex justify-between items-center bg-indigo-600`}
    >
      <div className="text-xl">
        <Link to='/' onClick={() => setNav('/')}>LOGO</Link>
      </div>
      <div className="flex items-center gap-x-3 md:hidden">
        <FiMenu size={24} onClick={() => setNav((prev) => !prev)} className="block" />
      </div>
      <ul className="hidden md:flex gap-5 items-end ml-auto">
        {navLink.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              className={`${
                isScroll ? "text-[14px]" : "text-[18px]"
              } hover:text-black transition duration-300 ease-in-out hover:cursor-pointer ${
                location.pathname === `/${item.id}` ? 'active' : ''
              }`}
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
        <ul className={`md:hidden ${nav ? 'block' : 'hidden'}`}>
          {navLink.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className={`${
                  isScroll ? "text-[14px]" : "text-[18px]"
                } hover:text-black transition duration-300 ease-in-out hover:cursor-pointer ${
                  location.pathname === `/${item.id}` ? 'active' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
