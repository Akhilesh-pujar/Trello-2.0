'use client';

import Image from "next/image"
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Avatar from "react-avatar"
import { useBoardStore } from "@/store/Boardstore";

function Header() {

    const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString])

    return (
        <header>
            {/* background gradient */}
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl ">
                <div
                    className="absolute top-0 
                left-0 w-full h-96
                 bg-gradient-to-br
                  from-purple-700 to-blue-500
                  rounded-md filter blur-3xl 
                     opacity-50 -z-50 

               "
                />

                <Image src="https://links.papareact.com/c2cdd5" alt="trllo logo"
                    width={300}
                    height={300}
                    className="w-44 md:w-56 md:pb-0 object-contain"
                />

                <div className=" flex items-center space-x-5 flex-1 justify-end
                 w-full
                ">
                    {/* search */}
                    <form className="flex  items-center space-x-5 bg-white p-2 shadow-md
                flex-1 md:flex-initial rounded-full 
                ">
                        <MagnifyingGlassIcon className=" h-6 w-6 text-gray-500" />
                        <input type="text" placeholder="Search" className="flex-1 outline-none p-2 "
                            value={searchString}
                            onChange={e => setSearchString(e.target.value)}
                        />
                        <button type="submit" hidden>Search</button>
                    </form>


                    {/* Avator */}
                    <Avatar name="Akhil" round size="50" />
                </div>


            </div>

            <div className="flex justify-center items-center px-5 md:py-5">
                <p className=" flex items-center rounded-xl bg-white italic text-sm font-light
                  shadow-xl p-5
                 pr-5 w-full max-w-3xl text-blue-500
                ">
                    <UserCircleIcon className="inline-block w-10 h-10 text-blue-500" />
                    GPT is summerizing your task for the day
                </p>
            </div>

        </header>
    )
}

export default Header
