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
    <div className="flex p-3 space-x-5">
      <Image
        src="/profile-pic.png"
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11"
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-1.5  text-[#707E89]">
          <span className="font-bold text-[#0F1419]">Guest</span>
          <span>@guest0000032</span>
          <span>·</span>
          <span>a day ago</span>
        </div>

        <span> asdasdsadasdads</span>
      </div>
    </div>
  );
}
