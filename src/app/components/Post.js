'use client';
import React, { useEffect, useState } from 'react'
import { 
    BookmarkIcon,
    ChatIcon,
    HeartIcon,
    PaperAirplaneIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon
 } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Moment from 'react-moment';

function Post({ id, username, userImg, img, caption }) {
  const session = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    return onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), 
    snapshot => setComments(snapshot.docs))
  }, [])

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment('');
    await addDoc(collection(db, 'posts', id, 'comments'), {
        comment: commentToSend,
        username: session.data.user.name,
        userimage: session.data.user.image,
        timestamp: serverTimestamp(),
    })
  };

  return (
    <div className='bg-black my-7 border border-gray-700 rounded-sm'>
        {/* Header */}
        <div className='flex items-center p-5'>
            <img className='rounded-full h-12 w-12 object-contain border 
            p-1 mr-3 cursor-pointer'
             src={userImg} alt={username}/>
            <p className='flex-1 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5' />
        </div>
        {/* Img */}
        <img src={img} className='object-cover w-full' />
        {/* Buttons */}
        {session.data && (
        <div className='flex justify-between px-4 pt-4'>
            <div className='flex space-x-4'>
                <HeartIcon className='postBut' />
                <ChatIcon className='postBut' />
                <PaperAirplaneIcon className='postBut rotate-90' />
            </div>
            <BookmarkIcon className='postBut'/>
        </div>
        )}
        {/* Captions */}
        <p className='p-5 truncate'>
            <span className='font-bold mr-1'>{username}</span>
            {caption}
        </p>

        {/* Comments */}
        {comments.length > 0 && (
            <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-slate-200
            scrollbar-thin'>
                {comments.map(comment => (
                    <div key={comment.id} className='flex items-center 
                    space-x-2 mb-3'>
                        <img className='h-7 rounded-full' src={comment.data().userimage} alt='' />
                        <p className='test-sm flex-1'>
                            <span className='font-bold'>{comment.data().username}</span>
                            {" "}{comment.data().comment}
                        </p>
                        <Moment className='pr-5 text-xs' 
                        fromNow>{comment.data().timestamp ? comment.data().timestamp.toDate() : Date.now()}
                        </Moment>
                    </div>
                ))}
            </div>
        )}
        {/* Input Box */}
        {session.data && (
        <div>
            <form className='flex items-center p-4'>
                <EmojiHappyIcon className='h-7' />
                <input type='text' className='border-none flex-1 focus:ring-0
                outline-none bg-black' placeholder='Add a comment...' 
                value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button 
                disabled={!comment.trim()} 
                onClick={sendComment}
                className='font-semibold text-blue-500'>Post</button>
            </form>
            
        </div>
        )}
    </div>
  )
}

export default Post