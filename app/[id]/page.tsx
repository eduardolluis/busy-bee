import { PostHeader } from "@/components/posts/Post";
import PostFeed from "@/components/posts/PostFeed";
import Sidebar from "@/components/Sidebar";
import SignUpPrompt from "@/components/SignUpPrompt";
import Widgets from "@/components/Widgets";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div
        className="text-[#0F1419] min-h-screen 
          max-w-[1400px] mx-auto flex justify-center
          "
      >
        <Sidebar />
        <div className="grow max-w-2xl border-x border-gray-100">
          <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100 flex items-center ">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Bumble
          </div>
          <div className="flex flex-col p-3 space-y-5 border-b border-gray-100">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex space-x-3">
                <Image
                  src={"/profile-pic.png"}
                  width={44}
                  height={44}
                  alt="PRofile Picture"
                  className="w-11 h-11"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] truncate max-w-[140px]">
                    dddddddddddddddddddddddddddddddddddddd
                  </span>
                  <span className="text-[#707E89] text-[15px] truncate max-w-[140px] ">
                    ddddddddddddddddddddddddddddddddddd
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </div>
            <span className="text-[15px]">Post Text</span>

            <div className="border-b border-gray-100 p-3 text-[15px]">
              <span className="font-bold">0</span> Likes
            </div>
            <div className="border-b border-gray-100 p-3 text-[15px] flex justify-evenly">
              <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            </div>
          </div>
          <Comment />
        </div>
        <Widgets />
      </div>
      <SignUpPrompt />
    </>
  );
}

function Comment() {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name="eduard123" username="123123  " text="username123123" />

      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
      </div>
    </div>
  );
}
