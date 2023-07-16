import { atom } from "recoil";

export const addKeywordState = atom<string> ({
    key: "addKeywordState",
    default: "",
});