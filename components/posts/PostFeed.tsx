import Post from "./Post";
import PostInput from "./PostInput";

export default function PostFeed() {
  return (
    <div className="grow max-w-2xl border-x border-gray-100">
      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
        Home
      </div>
      <PostInput />
      <Post />
    </div>
  );
}
