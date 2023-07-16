'use client'
import React, { useEffect, useState } from 'react'
import classes from './page.module.scss'
import { signOut, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '../components/Header'

const Page = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = () => {
    if (!session?.user.accessToken) {
      return;
    } else {
      const url = "https://api.github.com/user/repos?per_page=10&visibility=all";
      const headers = {
        Authorization: "token " + session.user.accessToken,
      };
      fetch(url, { headers })
        .then((res) => res.json())
        .then((json) => setRepos(json));
    }
  }
  return (
    <div className={classes.container}>
      <Header />
        <div>
          <div className={classes.name}>{session?.user.name}</div>
          <div>{session?.user.bio}</div>
          <div>{session?.user.following}</div>
          <div>{session?.user.followers}</div>
          <div>{session?.user.stars}</div>
          <h2>Repositories</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <Link href={`https://github.com/${repo.owner.login}/${repo.name}`} target="blank" rel="noopener noreferrer">{repo.name}</Link>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

// if (session) {
//   return (
//     <div className={classes.container}>
//       <span className={classes.img}>
//         <img src={session.user.image} height="120" width="80" alt="" />
//       </span>
//       <div className={classes.info}>
//         <span className={classes.name}>{session.user.name}</span>
//         <button className={classes.btn} onClick={() => signOut()}>ログアウトする</button>
//       </div>
//     </div>
//   )
// }
// return (
//   <div>
//     <button onClick={() => signIn('github')}>ログインしてください</button>
//   </div>
// )
// }

export default Page