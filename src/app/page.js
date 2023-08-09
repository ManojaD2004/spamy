import Image from 'next/image'
import Header from './components/Header'
import Feed from './components/Feed'
import Modal from './components/Modal'

export default function Home() {
  return (
    <main className="bg-gray-900 h-screen overflow-y-scroll
    scrollbar-hide scrollbar-none">
      <Header />
      <Feed />
      <Modal />
    </main>
  )
}
