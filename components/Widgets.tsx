import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Widgets() {
  return (
    <div className="p-3">
      <div className=" bg-[#EFF3F4] text-[#89959D] h-[44px] flex items-center space-x-3 rounded-full pl-5">
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search Busy Bee"
          className="bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
