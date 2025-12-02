"use client";

import { db } from "@/firebase";
import { closeCommentModal, openLogInModal } from "@/redux/slices/ModalSlices";
import { RootState } from "@/redux/store";
import {
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PostInputProps {
  insideModal?: boolean;
}

export default function PostInput({ insideModal }: PostInputProps) {
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentPostDetails
  );

  const dispatch = useDispatch();

  async function sendPost() {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
      photo: user.photo ?? "/profile-pic.png",
    });
    setText("");
  }

  async function sendComment() {
    const postRef = doc(db, "posts", commentDetails.id);

    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
        photo: user.photo ?? "/profile-pic.png",
      }),
    });
    setText("");
    dispatch(closeCommentModal());
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-100">
      <Image
        src={insideModal ? (user.photo ?? "/profile-pic.png") : "/busy-bee.jpg"}
        width={44}
        height={44}
        alt={insideModal ? "profile picture" : "logo"}
        className="w-11 h-11 rounded-full z-10 bg-transparent"
      />
      <div className="w-full">
        <textarea
          className="resize-none outline-none w-full min-h-[50px] text-lg "
          placeholder={insideModal ? "Send your reply" : "What's happening!?"}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <div className="flex justify-between pt-5 border-t border-gray-100">
          <div className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>
          <button
            className="bg-[#F4AF01] text-white w-20 h-9 rounded-full text-sm cursor-pointer disabled:bg-[#F4AF01]/65"
            onClick={() => (insideModal ? sendComment() : sendPost())}
            disabled={!text}
          >
            Bumble
          </button>
        </div>
      </div>
    </div>
  );
}
