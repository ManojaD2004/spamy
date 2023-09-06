"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  HeartIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header({ setChoice, choice }) {
  const sessions = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="shadow-sm bg-black py-3 md:py-0 shadow-white border-b sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => null}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src="/images/logo.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div
          onClick={() => null}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="/static/images/logo.png"
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>

        {/* Middle */}
        <div className="max-w-xs mr-4 hidden md:block">
          <div className=" relative mt-1 p-3  rounded-md">
            <div
              className=" absolute inset-y-0 pl-3 flex items-center 
                    pointer-events-none"
            >
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className=" bg-gray-950 block w-full pl-10 sm:text-sm
                    border-gray-700 border rounded-md focus:ring-white focus:border-white"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => null} className="navBut" />
          {/* <MenuIcon
            className="white h-10 md:hidden
                 cursor-pointer flex-shrink-0"
          /> */}

          {sessions.data ? (
            <>
              {/* <div className=" relative navBut">
                <PaperAirplaneIcon className="navBut rotate-45" />
                <div
                  className="absolute bg-red-500 -top-1 -right-2 h-5 w-5 rounded-full
                   flex items-center justify-center animate-pulse"
                >
                  3
                </div>
              </div> */}
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBut inline-block flex-shrink-0"
              />
              <form>
                <label for="room" className="md:pr-3 pr-2">
                  Room:{" "}
                </label>
                <select
                  name="room"
                  id="room"
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                  className="bg-black"
                >
                  <option value="world">World</option>
                  <option value="art">Art</option>
                  <option value="sports">Sports</option>
                  <option value="games">Games</option>
                </select>
              </form>
              {/* <UserGroupIcon className="navBut" /> */}
              {/* <HeartIcon className="navBut" /> */}
              <img
                onClick={signOut}
                src={sessions?.data?.user?.image}
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </>
          ) : (
            <>
              <form>
                <label for="room" className="md:pr-3 pr-2">
                  Room:{" "}
                </label>
                <select
                  name="room"
                  id="room"
                  value={choice}
                  onChange={(e) => setChoice(e.target.value)}
                  className="bg-black"
                >
                  <option value="world">World</option>
                  <option value="art">Art</option>
                  <option value="sports">Sports</option>
                  <option value="games">Games</option>
                </select>
              </form>
              <button onClick={signIn}>SignIn</button>
            </>
          )}
        </div>

        {/* Right */}
      </div>
    </div>
  );
}

export default Header;
