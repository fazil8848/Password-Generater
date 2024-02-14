import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  KeyIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/authSlice";
import { Toaster } from "react-hot-toast";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <>
      <div>
        <Navbar
          variant="gradient"
          color="blue-gray"
          className="mx-auto max-w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3 rounded-t-none rounded-b-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5 flex items-center gap-3"
            >
              <span className="flex">
                <LockClosedIcon className="h-6" />
                <KeyIcon className="h-6" />
              </span>
              PASS GEN
            </Typography>
            <div className="ml-auto flex gap-1 md:mr-4">
              {userInfo ? (
                <IconButton variant="text" color="white" onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                </IconButton>
              ) : (
                <Link to={"/login"}>
                  <IconButton variant="text" color="white">
                    <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                  </IconButton>
                </Link>
              )}
            </div>
          </div>
          <Toaster />
        </Navbar>
      </div>
    </>
  );
};

export default Header;
