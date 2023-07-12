/* eslint-disable @next/next/link-passhref */
"use client"
import classes from "../styles/components/Header.module.scss"
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    if (session) {
        return (
            <header className={classes.container}>
                <Link href="/MyGithub" className={classes.img}>
                    <Image alt="" src={session.user.image} height="120" width="80" />
                    <img src={session.user.image} height="120" width="80" alt="" />
                    <div className={classes.info}>
                        <button className={classes.btn} onClick={() => signOut()}>ログアウトする</button>
                    </div>
                </Link>
            </header>
        )
    }
    return (
        <header className={classes.container}>
            <span className={classes.img}>
                <Image src="./nobody.svg" height="40" width="40" alt="" />
            </span>
            <div className={classes.info}>
                <button className={classes.btn} onClick={() => signIn("github")}>ログインする</button>
            </div>
        </header>
    );
}