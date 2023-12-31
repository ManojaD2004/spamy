import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const session = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="rounded-full border p-[2px] w-16 h-16 "
        src={session?.data?.user?.image}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">
          {session.data
            ? session.data.user.name.split(" ").join("").toLocaleLowerCase()
            : "YourName"}
        </h2>
        <h3 className="text-gray-400 text-sm">Welcome to Spamy</h3>
      </div>
      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
