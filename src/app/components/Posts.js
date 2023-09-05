import React, { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Posts({ choice }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, `${choice}`), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs)
    );
  }, [choice]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          choice={choice}
          id={post.id}
          key={post.id}
          email={post.data().useremail}
          username={post.data().username}
          userImg={post.data().profileimg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}
