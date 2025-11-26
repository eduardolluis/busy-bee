import Image from "next/image";

export default function Post() {
  return (
    <div>
      <PostHeader />
    </div>
  );
}

export function PostHeader() {
  return (
    <div className="flex p-3">
      <Image
        src="/profile-pic.png"
        width={44}
        height={44}
        alt="Profile Picture"
      />
    </div>
  );
}
