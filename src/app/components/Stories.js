import React, { useEffect, useState } from "react";
import { createRandomUser } from "../ExternalLibs/fakerjs";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const session = useSession();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...createRandomUser(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div
      className="mt-8 border-gray-700 border flex space-x-2
    rounded-sm bg-black p-6 overflow-x-scroll
    scrollbar-thin scrollbar-thumb-white"
    >
      {session.data && (
        <Story
          key={0}
          img={session.data.user.image}
          username={session.data.user.name
            .split(" ")
            .join("")
            .toLocaleLowerCase()}
        />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
      {/* Story */}
      {/* Stroy */}
    </div>
  );
}

export default Stories;
