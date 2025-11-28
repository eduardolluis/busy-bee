"use client";

import {
  closeLogInModal,
  openLogInModal,
  openSignUpModal,
} from "@/redux/slices/ModalSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/userSlice";

export default function LogInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);
  const dispatch: AppDispatch = useDispatch();

  async function handleLogin() {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          name:
            result.user.displayName ?? result.user.email?.split("@")[0] ?? null,
          username: result.user.email?.split("@")[0] ?? null,
          email: result.user.email ?? "",
          uid: result.user.uid,
          photo: result.user.photoURL ?? "/profile-pic.png",
        })
      );
      dispatch(closeLogInModal());
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      dispatch(
        setUser({
          name:
            result.user.displayName ?? result.user.email?.split("@")[0] ?? null,
          username: result.user.email?.split("@")[0] ?? null,
          email: result.user.email ?? "",
          uid: result.user.uid,
          photo: result.user.photoURL ?? "/profile-pic.png",
        })
      );

      dispatch(closeLogInModal());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        onClick={() => dispatch(openLogInModal())}
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-[15px] md:text-sm border border-white/30 rounded-full text-white font-bold hover:bg-white/20 transition"
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center modal-backdrop"
      >
        <div
          className={`modal-content ${
            isOpen ? "animate-modal-open" : "animate-modal-close"
          }`}
        >
          <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl shadow-xl">
            <XMarkIcon
              className="w-7 mt-5 mx-5 cursor-pointer hover:text-gray-500 transition"
              onClick={() => dispatch(closeLogInModal())}
            />
            <div className="pt-10 pb-20 px-4 sm:px-20">
              <h1 className="text-3xl font-bold mb-10">Log In to Busy Bee</h1>

              {/* Inputs */}
              <div className="w-full space-y-5 mb-10">
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
                    className="w-full h-full  outline-none"
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

              <button
                className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full font-semibold hover:bg-[#d69800] transition"
                onClick={handleLogin}
              >
                Log In
              </button>

              <p className="text-center text-gray-400 mb-3">Or</p>

              {/* Login With Google */}
              <button
                className="bg-white text-black h-[48px] rounded-full shadow-sm mb-5 w-full border border-gray-300 flex justify-center items-center gap-3 hover:bg-gray-50 transition font-medium"
                onClick={handleGoogleLogin}
              >
                <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
                Log In with Google
              </button>

              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    dispatch(closeLogInModal());
                    dispatch(openSignUpModal());
                  }}
                  className="text-[#F4AF01] font-bold cursor-pointer hover:underline transition"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
