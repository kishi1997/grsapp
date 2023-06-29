'use client'

import React from 'react'
import classes from './page.module.scss'
import { signOut, signIn, useSession } from 'next-auth/react'

const Page = () => {

  const { data: session } = useSession();

    if(session) {
      return (
        <div className={classes.container}>
          <span className={classes.img}>
              <img src={session.user.image} height="120" width="80" alt="" />
          </span>
          <div className={classes.info}>
              <span className={classes.name}>{session.user.name}</span>
              <button className={classes.btn} onClick={() => signOut()}>ログアウトする</button>
          </div>
        </div>
      )
    }
    return (
      <div>
      <button onClick={() => signIn('github')}>ログインしてください</button>
      </div>
    )
}

export default Page