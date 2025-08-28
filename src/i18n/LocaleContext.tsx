import React from 'react';
import { Locale, routing } from './routing';

export const LocaleContext = React.createContext<Locale>(routing.defaultLocale);
