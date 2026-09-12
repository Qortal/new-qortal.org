import { atom } from 'jotai';

export enum EnumTheme {
  LIGHT = 1,
  DARK = 2,
}

const THEME_STORAGE_KEY = 'qortal-org.theme';

function getInitialTheme(): EnumTheme {
  if (typeof window === 'undefined') {
    return EnumTheme.DARK;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light') {
    return EnumTheme.LIGHT;
  }
  if (storedTheme === 'dark') {
    return EnumTheme.DARK;
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? EnumTheme.LIGHT
    : EnumTheme.DARK;
}

const themeStateAtom = atom<EnumTheme>(getInitialTheme());

export const themeAtom = atom(
  (get) => get(themeStateAtom),
  (_get, set, nextTheme: EnumTheme) => {
    set(themeStateAtom, nextTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        nextTheme === EnumTheme.LIGHT ? 'light' : 'dark'
      );
    }
  }
);
