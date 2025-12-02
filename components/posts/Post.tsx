"use client";

import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import {
  arrayRemove,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import {
  openCommentModal,
  openLogInModal,
  setCommentDetails,
} from "@/redux/slices/ModalSlices";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";

moment.locale("es");

interface PostProps {
  data: any;
  id: string;
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function likePost() {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    const postRef = doc(db, "posts", id);

    if (data.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  }

  return (
    <div className="border-b border-gray-100">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timeStamp={data.timestamp}
          text={data.text}
          photo={data.photo}
        />
      </Link>

      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] cursor-pointer hover:text-[#F4AF01] transition"
            onClick={() => {
              if (!user.username) {
                dispatch(openLogInModal());
                return;
              }

              dispatch(
                setCommentDetails({
                  name: data.name,
                  username: data.username,
                  id,
                  text: data.text,
                })
              );
              dispatch(openCommentModal());
            }}
          />
          {data.comments.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.comments.length}
            </span>
          )}
        </div>
        <div className="relative">
          {data.likes.includes(user.uid) ? (
            <SolidHeartIcon
              className="w-[22px] h-[22px] cursor-pointer text-pink-500 transition"
              onClick={() => likePost()}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
              onClick={() => likePost()}
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.likes.length}
            </span>
          )}
        </div>

        <div className="relative">
          <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        </div>

        <div className="relative">
          <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        </div>
      </div>
    </div>
  );
}

interface PostHeaderProps {
  username: string;
  name: string;
  timeStamp?: Timestamp;
  text: string;
  photo?: string;
  replyTo?: string;
}

export function PostHeader({
  username,
  name,
  timeStamp,
  text,
  photo,
  replyTo,
}: PostHeaderProps) {
  const formattedTime = timeStamp
    ? moment(timeStamp.toDate()).fromNow()
    : "Hace un momento";

  return (
    <div className="flex p-3 space-x-5">
      <Image
        src={photo ?? "/profile-pic.png"}
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11 rounded-full object-cover z-10"
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-1.5 text-[#707E89]">
          <span className="font-bold text-[#0F1419] truncate max-w-[140px]">
            {name}
          </span>
          <span className="truncate max-w-[140px]">@{username}</span>
          <span>·</span>
          <span>{formattedTime}</span>
        </div>

        <span>{text}</span>

        {replyTo && (
          <span className="text-[15px] text-[#707E89]">
            Replying to <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
