import React, { FC, useEffect } from 'react';
import { EnumTheme, themeAtom } from '../../state/global/system';
import { useAtom } from 'jotai';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [theme] = useAtom(themeAtom);
  const isLight = theme === EnumTheme.LIGHT;

  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
    const themeColor = document.head.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    themeColor?.setAttribute('content', isLight ? '#eef3f8' : '#02060c');
  }, [isLight]);

  return children;
};

export default ThemeProviderWrapper;
