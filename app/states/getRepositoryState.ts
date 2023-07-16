import {atom } from "recoil";
import Repo from "../type";

export const getRepositoryState = atom<Array<Repo>> ({
    key: "getRepositoryState",
    default: [],
});
