import { create } from "zustand";

/**
 * Küçük, kontrollü global durum (CLAUDE.md bölüm 2.1).
 * Kaydırma ilerlemesi burada TUTULMAZ: o `scroll-bus.ts` içindedir ve
 * her karede React'i uyandırmaz.
 */
type UiState = {
  /** Ses varsayılan kapalı. Yalnızca kullanıcı etkileşimiyle açılır. */
  soundEnabled: boolean;
  /** prefers-reduced-motion. ScrollProvider günceller. */
  reducedMotion: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  soundEnabled: false,
  reducedMotion: false,
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
