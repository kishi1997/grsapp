import { atom } from "recoil";

export const errorState = atom<string | null>({
    key: "error",
    default: null,
})