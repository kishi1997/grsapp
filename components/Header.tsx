"use client"
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <h1>login</h1>
                <button>sign out</button>
            </div>
        )
    }
    return (
        <div>
            <h1>log out</h1>
            <Image src="./nobody.svg" height="120" width="80" alt="" />
            <button onClick={() => signIn("github")}>sign in</button>
        </div>
    );
}