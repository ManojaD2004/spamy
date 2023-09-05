"use client";
import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import Comment from "./Comment";

function Post({ id, username, userImg, img, caption, email, choice }) {
  const session = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, `${choice}`, id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, `${choice}`, id, "comments"), {
      comment: commentToSend,
      username: session.data.user.name,
      userimage: session.data.user.image,
      useremail: session.data.user.email,
      timestamp: serverTimestamp(),
    });
  };

  async function deletPost() {
    const docRef = doc(db, `${choice}`, id);
    const imageRef = ref(storage, `posts/${id}/image`);
    comments.map(async (comment) => {
      const commentRef = doc(db, `${choice}`, id, "comments", comment.id);
      await deleteDoc(commentRef);
    });
    await deleteDoc(docRef);
    await deleteObject(imageRef);
  }

  return (
    <div className="bg-black my-7 border border-gray-700 rounded-sm">
      {/* Header */}
      <div
        onClick={() => setShowPopUp(false)}
        className="flex items-center p-5 relative"
      >
        <img
          className="rounded-full h-12 w-12 object-contain border 
            p-1 mr-3 cursor-pointer"
          src={userImg}
          alt={username}
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon
          onClick={(e) => {
            e.stopPropagation();
            if (session.data && session.data.user.email === email) {
              setShowPopUp(!showPopUp);
            }
          }}
          className="h-5"
        />
        {showPopUp && (
          <div
            onClick={deletPost}
            className="animate-[bounce_0.6s_ease-in-out_1_forwards] absolute right-8 bg-white text-black
            font-bold py-1 px-3 rounded-md top-10 cursor-pointer
             hover:bg-gray-200 ease-in-out duration-300 transition-colors"
          >
            Delete Post
          </div>
        )}
      </div>
      {/* Img */}
      <img src={img} className="object-cover w-full" />
      {/* Buttons */}
      {session.data && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {/* <HeartIcon className="postBut" /> */}
            <ChatIcon className="postBut" />
            {/* <PaperAirplaneIcon className="postBut rotate-90" /> */}
          </div>
          {/* <BookmarkIcon className="postBut" /> */}
        </div>
      )}
      {/* Captions */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div
          className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-slate-200
            scrollbar-thin"
        >
          {comments.map((comment) => (
            <Comment key={comment.id} parentId={id} choice={choice} comment={comment} />
          ))}
        </div>
      )}
      {/* Input Box */}
      {session.data && (
        <div>
          <form className="flex items-center p-4">
            <EmojiHappyIcon className="h-7" />
            <input
              type="text"
              className="border-none flex-1 focus:ring-0
                outline-none bg-black"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-blue-500"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
