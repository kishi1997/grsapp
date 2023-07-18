'use client'
import React, { useEffect, useState } from 'react'
import classes from './page.module.scss'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '../components/Header'
import { accountReposState } from '../states/atoms/accountReposState'
import { useRecoilState } from 'recoil'
import { headers } from 'next/dist/client/components/headers'

const Page = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useRecoilState(accountReposState);
console.log(session);

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

  useEffect(() => {
    fetchRepos();
  }, []);

  // ログインしていない場合はログインボタンを表示するなどの処理を行う
  if (!session) {
    return (
      <div>
        <Header />
        <div className={classes.container__notLogin}>
          <h1>ログインしてください。</h1>
          <div>
            <Link className={classes.btn} href="../">Topに戻る</Link>
          </div>
        </div>
      </div>
    )
  }

  // ログインしたユーザーの情報を表示
  return (
    <div>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.name}>{session?.user.name}</h1>
        <div><p>{session?.user.bio}</p></div>
        <div>follow数：{session?.user.following}</div>
        <div>follower数：{session?.user.followers}</div>
        <div>スター数：{session?.user.stars}</div>
        <div>
          <h2>Your Repositories</h2>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id} className={classes.repoList}>
                <Link href={`https://github.com/${repo.owner.login}/${repo.name}`} target="blank" rel="noopener noreferrer">{repo.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link className={classes.btn} href="../">Topに戻る</Link>
        </div>
      </div>
    </div>
  );
}

export default Page