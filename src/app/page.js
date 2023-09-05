'use client';
import Image from "next/image";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Modal from "./components/Modal";
import { useState } from "react";

export default function Home() {
  const [choice, setChoice] = useState("world");
  return (
    <main
      className="bg-gray-900 h-screen overflow-y-scroll
    scrollbar-hide scrollbar-none"
    >
      <Header setChoice={setChoice} choice={choice} />
      <Feed choice={choice} />
      <Modal />
    </main>
  );
}
