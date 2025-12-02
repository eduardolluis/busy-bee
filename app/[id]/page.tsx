import { PostHeader } from "@/components/posts/Post";
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
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

interface Comment {
  name: string;
  text: string;
  username: string;
  photo?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // Obtener el ID del post de los parámetros
  const { id } = await params;

  // Obtener el documento del post desde Firebase
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);

  // Si el post no existe, mostrar página 404
  if (!postSnap.exists()) {
    notFound();
  }

  // Obtener los datos del post
  const post = postSnap.data();

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
                  src={post?.photo || "/profile-pic.png"}
                  width={44}
                  height={44}
                  alt="Profile Picture"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] truncate max-w-[140px]">
                    {post?.name}
                  </span>
                  <span className="text-[#707E89] text-[15px] truncate max-w-[140px] ">
                    @{post?.username}
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </div>
            <span className="text-[15px]">{post?.text}</span>
            <div className="border-b border-gray-100 p-3 text-[15px]">
              <span className="font-bold">{post?.likes?.length || 0}</span>{" "}
              Likes
            </div>
            <div className="border-b border-gray-100 p-3 text-[15px] flex justify-evenly">
              <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
              <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            </div>
          </div>
          {post?.comments &&
            post.comments.length > 0 &&
            post.comments.map((comment: Comment, index: number) => (
              <Comment
                key={index}
                name={comment.name}
                username={comment.username}
                text={comment.text}
                photo={comment.photo}
              />
            ))}
        </div>
        <Widgets />
      </div>
      <SignUpPrompt />
    </>
  );
}

interface CommentProps {
  name: string;
  username: string;
  text: string;
  photo?: string;
}

function Comment({ name, username, text, photo }: CommentProps) {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} photo={photo} />
      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
      </div>
    </div>
  );
}
