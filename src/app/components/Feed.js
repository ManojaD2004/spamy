'use client';
import React from 'react'
import Stories from './Stories'
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';

function Feed() {
  const session = useSession();
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 
    xl:max-w-6xl mx-auto ${!session.data && '!max-w-3xl !grid-cols-1'}`}>
      <section className='col-span-2 '>
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      {session.data && (
      <section className='hidden xl:inline-grid'>
        <div className='fixed '>
          {/* Mini Profile */}
          <MiniProfile />
          {/* Suggestions */}
          <Suggestions />
        </div>
      </section>
      )}
    </div>
  )
}

export default Feed