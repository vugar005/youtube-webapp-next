import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Fragment } from 'react'
import BrowserVideos from '@/components/browse-videos/browse-videos'

export default function Dashboard() {

  return (
   <Fragment>
    <BrowserVideos/>
   </Fragment>
  )
}
