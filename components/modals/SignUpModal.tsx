"use client";

import { closeSignUpModal, openSignUpModal } from "@/redux/slices/ModalSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpModal() {


  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();
  console.log(isOpen);
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
        <div className="w-[200px] h-[400px] bg-white"></div>
      </Modal>
    </>
  );
}
