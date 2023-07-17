import { atom } from "recoil";

export const isClickedState = atom<boolean>({
    key: "isClickedState",
    default: false,
});