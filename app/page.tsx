import Board from '@/components/Board'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <Header />
      <Board />
      <Footer />
    </main>
  )
}
