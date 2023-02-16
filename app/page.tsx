import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
const inter = Inter({ subsets: ['latin'] })
import TransitionButton from './TransitionButton'


export default function Home() {
  return (
    <>
      <TransitionButton />
    </>
  )
}
