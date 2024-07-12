import React from 'react';
import { useThemeContext } from '../context/theme/ThemeContext';
import { useLanguageContext } from '../context/language/LanguageContext';

export default function About() {
  const { theme } = useThemeContext();
  const { currentLanguage: lang } = useLanguageContext();

  return (
    <div className={'about ' + theme}>
      <h1>{lang.about.title}</h1>
      <h3>{lang.about.heading}</h3>

      <p>{lang.about.text.p1}</p>
      <p>{lang.about.text.p2}</p>
    </div>
  );
}
