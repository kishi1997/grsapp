import { userRepo } from "@/app/type";
import { atom } from "recoil";

export const accountReposState = atom<Array<userRepo>>({
    key: "accountReposState",
    default: [],
})