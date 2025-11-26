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
          <span className="font-bold text-[#0F1419] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-[60x] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            Guestasdasdasdsad
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-[60x] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            @guest0000032
          </span>
          <span>·</span>
          <span>a day ago</span>
        </div>

        <span> asdasdsadasdads</span>
      </div>
    </div>
  );
}
