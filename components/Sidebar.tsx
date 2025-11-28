"use client";

import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const username = useSelector((state: RootState) => state.user.username);
  const photo = useSelector((state: RootState) => state.user.photo);
  const isLoggedIn = useSelector((state: RootState) => !!state.user.uid);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(clearUser());
    setIsMenuOpen(false);
  }

  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20 xl:mr-10">
      <div className="relative h-full">
        <div className="py-3">
          <Image
            alt="busy-bee logo"
            src={"/busy-bee.jpg"}
            width={48}
            height={48}
          />
        </div>

        <ul>
          <SidebarLink Icon={HomeIcon} text="Home" />
          <SidebarLink Icon={HashtagIcon} text="Explore" />
          <SidebarLink Icon={BellIcon} text="Notifications" />
          <SidebarLink Icon={InboxIcon} text="Messages" />
          <SidebarLink Icon={BookmarkIcon} text="Bookmarks" />
          <SidebarLink Icon={UserIcon} text="Profile" />
          <SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />

          {isLoggedIn && (
            <button className="hidden xl:block bg-[#F4AF01] w-[200px] h-[52px] rounded-full text-white font-medium cursor-pointer shadow-md mt-2">
              Bumble
            </button>
          )}
        </ul>

        {/* Profile Section */}
        <div
          className={`absolute bottom-6 flex items-center space-x-2 xl:p-3 xl:pe-6
            hover:bg-gray-500/10 rounded-full transition cursor-pointer select-none
            ${!isLoggedIn && "opacity-60"} `}
          onClick={() => {
            if (!isLoggedIn) return;
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <Image
            src={photo ? photo : "/profile-pic.png"}
            height={36}
            width={36}
            alt="Profile Pic"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden xl:flex flex-col text-sm">
            <span className="font-bold">{username || "Guest"}</span>
            <span className="text-gray-500">@{username || "guest"}</span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && isLoggedIn && (
          <div
            ref={menuRef}
            className="absolute bottom-20 bg-white shadow-xl border w-48 py-2 rounded-xl z-50 animate-fade-slide"
          >
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
              Profile
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 w-full text-red-500"
              onClick={handleSignOut}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  text: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

function SidebarLink({ text, Icon }: SidebarLinkProps) {
  return (
    <li className="flex items-center xl:text-xl text-lg mb-2 space-x-3 p-2.5 hover:bg-gray-200/20 rounded-full transition">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}
