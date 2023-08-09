import React, { useEffect, useState } from 'react'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), 
        snapshot => setPosts(snapshot.docs))
    }, []);

  return (
    <div>
        {posts.map(post => (
            <Post id={post.id} key={post.id} 
            username={post.data().username} userImg={post.data().profileimg} 
            img={post.data().image} caption={post.data().caption} />
        ))}
    </div>
  )
}
