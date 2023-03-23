import React from "react";
import { atom } from "jotai";
import { IComponentItemProps } from "./pages/Maker/components/comList/schema";

export const cardsAtom = atom<IComponentItemProps[] | []>([]);
export const scrollYAtom = atom<number>(0);
export const showIframeAtom = atom<boolean>(true);
export const compActiveIndexAtom = atom<number | null>(null);  // 画布中当前正选中的组件

