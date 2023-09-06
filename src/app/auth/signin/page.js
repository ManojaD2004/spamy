"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import Header from "@/app/components/Header";
import Image from "next/image";

function SignIn() {
  const [providers, setProviders] = useState({});
  useEffect(async () => {
    const providers = await getProviders();
    setProviders(providers);
  }, []);
  /* 
  {
  google: {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    signinUrl: 'http://localhost:3000/api/auth/signin/google',
    callbackUrl: 'http://localhost:3000/api/auth/callback/google'
  }
}
  */
  return (
    <div>
      <Header />
      <div
        className="flex items-center justify-evenly flex-col min-h-[85vh]
      py-2 px-14 text-center"
      >
        <img
          width={320}
          height={320}
          src="https://firebasestorage.googleapis.com/v0/b/insta-2-build.appspot.com/o/Logo%2Flogo.png?alt=media&token=8563de1d-3b36-4c48-bee2-548c0e9f3e9d"
          alt=""
        />
        <p className="font-xs italic">
          
          {/* Project Credits: Coding Club - Dark Mode */}
        </p>
        <div className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 p-3 text-white rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
