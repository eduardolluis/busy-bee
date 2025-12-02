"use client";

import { useEffect, useState } from "react";
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Widgets() {
  const [users, setUsers] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resUsers = await fetch("https://randomuser.me/api/?results=3");
        const usersData = await resUsers.json();
        setUsers(usersData.results);

        const resPosts = await fetch("https://dummyjson.com/posts?limit=3");
        const postsData = await resPosts.json();

        const tags = Array.from(
          new Set(postsData.posts.flatMap((p: any) => p.tags))
        ).slice(0, 5);

        setTrends(tags);
      } catch (err) {
        console.log("API Error:", err);
      }
    };
    loadData();
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-[350px] p-3 space-y-4">
      {/* Search */}
      <div className="bg-[#EFF3F4] text-[#89959D] h-11 flex items-center space-x-3 rounded-full pl-5">
        <MagnifyingGlassIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search Busy Bee"
          className="bg-transparent outline-none"
        />
      </div>

      <div className="bg-[#EFF3F4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">What's Happening</h1>
        {trends.map((t: string, i: number) => (
          <div
            key={i}
            className="py-3 border-b border-gray-300 last:border-none"
          >
            <div className="flex justify-between text-[#536471] text-xs">
              <span>Trending Worldwide</span>
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </div>
            <span className="font-bold">#{t} </span>
            <span className="text-xs text-[#536471]">
              {Math.floor(Math.random() * 900)}k Bumbles
            </span>
          </div>
        ))}
      </div>

      {/* Who to Follow */}
      <div className="bg-[#EFF3F4] rounded-xl p-3">
        <h1 className="text-xl font-bold mb-2">Who to Follow</h1>
        {users.map((user: any, i: number) => (
          <div key={i} className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <Image
                src={user.picture.thumbnail}
                width={40}
                height={40}
                alt={user.name.first}
                className="rounded-full"
              />
              <div className="text-sm">
                <span className="font-bold">
                  {user.name.first} {user.name.last}
                </span>
                <p className="text-[#536471]">@{user.login.username}</p>
              </div>
            </div>
            <button className="bg-[#0F1419] text-white px-3 h-8 rounded-full text-xs">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
