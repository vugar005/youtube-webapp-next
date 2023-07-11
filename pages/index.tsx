import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Fragment } from 'react'
import MiniSidebar from '@/components/mini-sidebar/mini-sidebar'

export default function Dashboard() {

  return (
   <Fragment>
    <MiniSidebar/>
   </Fragment>
  )
}
