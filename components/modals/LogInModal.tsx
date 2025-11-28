"use client";

import {
  closeLogInModal,
  closeSignUpModal,
  openLogInModal,
  openSignUpModal,
} from "@/redux/slices/ModalSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LogInModal() {
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);

  const dispatch: AppDispatch = useDispatch();
  console.log(isOpen);

  return (
    <>
      <button
        onClick={() => dispatch(openLogInModal())}
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-[15px] md:text-sm border-2 border-gray-100 rounded-full text-white font-bold hover:bg-white/25 transition"
      >
        Login
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">
          <XMarkIcon
            className="w-7 mt-5 mx-5 cursor-pointer "
            onClick={() => dispatch(closeLogInModal())}
          />
          <form className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10"> Log In to Busy Bee</h1>
            <div className="w-full space-y-5 mb-10">
              <input
                placeholder="Email"
                type="email"
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
              />
              <div className="w-full h-[54px] overflow-hidden border border-gray-200 outline-none ps-3 rounded-[4px] pr-3 focus-within:border-[#F4AF01] transition flex items-center">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full  outline-none"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-7 h-7 text-gray-400 cursor-pointer transition"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full">
              Log In
            </button>
            <span className="mb-5 texr-sm text-center block">Or</span>
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full">
              Log In as Guest
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
