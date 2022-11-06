import styled from "styled-components";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../config";
import { useEffect } from "react";

import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
// import { auth, provider } from "../firebase";
// import { Link, NavLink } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);

  const handleLogin = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          toast.success("Login Succesfully");
          setUser(result.user);
          // const user = result.user;
          // console.log(user.photoURL);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch(() => {
          toast.error("Login Failed");
        });
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <>
      <ToastContainer />
      <Nav>
        <Logo>
          <img src="images/logo.svg" alt="" />
        </Logo>
        {!userName ? (
          <Login onClick={handleLogin}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <Link to="/home">
                <img src="images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </Link>
              <Link to="/">
                <img src="images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </Link>
              <Link to="/home">
                <img src="images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
              </Link>
              <a href="#originals">
                <img src="images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </a>
              <a href="#movies">
                <img src="images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </a>
            </NavMenu>
            <Lol>Hello, {userName.split(" ").shift()}</Lol>
            <SignOut>
              <UserImg
                referrerPolicy="no-referrer"
                src={userPhoto}
                alt={userName}
              />
              <DropDown>
                <span onClick={handleLogin}>SignOut</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  margin: 0;
  margin-right: auto;
  margin-left: 25px;
  padding: 0;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      line-height: 1.08;
      letter-spacing: 1.42px;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &::before {
        content: "";
        /* background-color: rgb(249, 249, 249); */
        background-color: #0063e5;
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        height: 2px;
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: 300ms cubic-bezier(cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s);
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important ;
        /* left: 5px; */
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 7px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition: 1s;
    }
  }
`;

const Lol = styled.span`
  letter-spacing: 1px;
  margin-right: 1rem;
`;

export default Header;
