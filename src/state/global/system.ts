import { atom } from 'jotai';

export enum EnumTheme {
  LIGHT = 1,
  DARK = 2,
}

const themeStateAtom = atom<EnumTheme>(EnumTheme.DARK);

// Keep the website in dark mode for now, even if older UI paths or embeds
// attempt to flip the theme back to light.
export const themeAtom = atom(
  (get) => get(themeStateAtom),
  (_get, set, nextTheme: EnumTheme) => {
    void nextTheme;
    set(themeStateAtom, EnumTheme.DARK);
  }
);
