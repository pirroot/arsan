"use client";

import { create } from "zustand";

type WebglState = "pending" | "on" | "off";

type AppState = {
  /** پری‌لودر تمام شده و انیمیشن‌های ورود هیرو می‌توانند شروع شوند */
  ready: boolean;
  setReady: (v: boolean) => void;
  webgl: WebglState;
  setWebgl: (v: WebglState) => void;
};

export const useAppStore = create<AppState>((set) => ({
  ready: false,
  setReady: (ready) => set({ ready }),
  webgl: "pending",
  setWebgl: (webgl) => set({ webgl }),
}));
