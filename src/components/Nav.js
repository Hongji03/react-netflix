import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log('window.scrollY', window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`./search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav_black"} `}>
      <img 
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/500px-Netflix_2015_logo.svg.png'
        className='nav_logo'
        onClick={() => window.location.reload()}
      />

      <input 
        value={searchValue} 
        onChange={handleChange} 
        className='nav_input'
        type='text'
        placeholder='영화를 검색해주세요.'
      />

      <img 
        alt='User logged'
        src='https://occ-0-1360-395.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
        className='nav_avatar'
      />
    </nav>
  );
}
