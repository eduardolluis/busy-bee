"use client";

import { closeSignUpModal, openSignUpModal } from "@/redux/slices/ModalSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUpWithEmail, signUpWithGoogle } from "../../authService";

export default function SignUpModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    try {
      const result = await signUpWithEmail(email, password);
      console.log("User Email:", result.user);
      dispatch(closeSignUpModal());
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  }

  async function handleGoogleSignUp() {
    try {
      const result = await signUpWithGoogle();
      console.log("User Google:", result.user);
      dispatch(closeSignUpModal());
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <>
      <button
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-[15px] md:text-sm font-bold bg-white rounded-full"
        onClick={() => dispatch(openSignUpModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">
          <XMarkIcon
            className="w-7 mt-5 mx-5 cursor-pointer"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create Your Account</h1>

            {/* Inputs */}
            <div className="w-full space-y-5 mb-10">
              <input
                placeholder="Name"
                type="text"
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
              />
              <input
                placeholder="Email"
                type="email"
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="w-full h-[54px] overflow-hidden border border-gray-200 outline-none ps-3 rounded-[4px] pr-3 focus-within:border-[#F4AF01] transition flex items-center">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-7 h-7 text-gray-400 cursor-pointer transition"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            {/* Sign Up Email */}
            <button
              className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full font-semibold hover:bg-[#d69800] transition"
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            <span className="mb-3 text-sm text-center block">Or</span>

            {/* Sign Up With Google */}
            <button
              className="bg-white text-black h-[48px] rounded-full shadow-sm mb-5 w-full border border-gray-300 flex justify-center items-center gap-3 hover:bg-gray-50 transition font-medium"
              onClick={handleGoogleSignUp}
            >
              <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
              Sign Up with Google
            </button>

            {/* Guest */}
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md w-full font-semibold hover:bg-[#d69800] transition">
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
