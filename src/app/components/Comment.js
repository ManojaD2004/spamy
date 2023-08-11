import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Moment from 'react-moment'
import { db } from '../firebase/firebase';

function Comment({ parentId, comment }) {
  const sessions = useSession();
  const [showPopUp, setShowPopUp] = useState(false);
  async function deletComment() {
    const docRef = doc(db, 'posts', parentId, 'comments', 
    comment.id);
    await deleteDoc(docRef);
  }
  return (
    <div key={comment.id} onClick={() => setShowPopUp(false)}
    className='flex items-center space-x-2 mb-3 relative'>
        <img className='h-7 rounded-full' src={comment.data().userimage} alt='' />
            <p className='test-sm flex-1'>
                <span className='font-bold'>{comment.data().username}</span>
                {" "}{comment.data().comment}
            </p>
        <DotsHorizontalIcon onClick={(e) => {
            e.stopPropagation();
            if (sessions.data && sessions.data.user.email === comment.data().useremail)
            {setShowPopUp(!showPopUp);}}} className='h-5'/>
        {showPopUp && (<div onClick={deletComment} className='animate-[bounce_0.6s_ease-in-out_1_forwards] absolute
            right-32 bg-white text-black
            font-bold py-1 px-3 rounded-md top-2 cursor-pointer
             hover:bg-gray-200 ease-in-out duration-300 transition-colors'>
                Delete Comment
            </div>)}
        <Moment className='pr-5 text-xs' 
        fromNow>{comment.data().timestamp ? comment.data().timestamp.toDate() : Date.now()}
        </Moment>
    </div>
  )
}

export default Comment