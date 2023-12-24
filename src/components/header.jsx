import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLink } from "../data/navLink";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import './style/header.css';
import classNames from 'classnames';

const Header = () => {
  const [nav, setNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setIsScroll(currentScrollPos > 0);

      // Memeriksa arah scroll
      if (currentScrollPos > prevScrollPos) {
        setIsScroll(true); // Jika scroll ke bawah, sembunyikan header
      } else {
        setIsScroll(false); // Jika scroll ke atas, tampilkan header
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={classNames({
        'h-[4rem] lg:px-[72px] px-5 w-full z-[10] text-white fixed transition-all duration-300 ease-in-out flex justify-between items-center bg-orange': !isScroll,
        'bg-orange bg-opacity-75': window.scrollY > 0 && window.scrollY > window.innerHeight,
        'bg-orange': window.scrollY >= window.innerHeight,
      })}
    >
      <Link to='/' onClick={() => setNav('/')}>
        <img src="unnamed.png" alt="" className="h-[4rem]"/>
      </Link>
      <div className="flex items-center gap-x-3 md:hidden">
        <FiMenu size={24} onClick={() => setNav((prev) => !prev)} className="block" />
      </div>
      <ul className="hidden md:flex gap-5 items-end ml-auto">
        {navLink.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              className={`${isScroll ? "text-[14px]" : "text-[18px]"
                } transition duration-300 ease-in-out hover:cursor-pointer ${location.pathname === `/${item.id}` ? 'active' : ''
                }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        className={`${nav ? "right-0" : "-right-full"
          } w-full bg-orange absolute top-0 p-10 block md:hidden`}
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
                className={`${isScroll ? "text-[14px]" : "text-[18px]"
                  } transition duration-300 ease-in-out hover:cursor-pointer ${location.pathname === `/${item.id}` ? 'active' : ''
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
