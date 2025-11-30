"use client";
import { closeCommentModal } from "@/redux/slices/ModalSlices";
import { RootState } from "@/redux/store";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PostHeader } from "@/components/posts/Post";
import PostInput from "@/components/posts/PostInput";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CommentModal() {
  const open = useSelector((state: RootState) => state.modals.commentModalOpen);
  const dispatch = useDispatch();
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentPostDetails
  );

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className=" bg-white w-full h-full sm:w-[600px] sm:h-fit sm:rounded-xl outline-none relative">
          <XMarkIcon
            className="w-7 mt-5 mx-5 cursor-pointer hover:text-gray-500 transition"
            onClick={() => dispatch(closeCommentModal())}
          />
          <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
            <PostHeader
              name={commentDetails.name}
              username={commentDetails.username}
              text={commentDetails.text}
              replyTo="eduardo"
            />
            <div className="mt-4">
              <PostInput insideModal={true} />
            </div>
            <div className="absolute w-0.5 h-32 bg-gray-300 left-[33px] sm:left-[53px] top-25 z-0"></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
