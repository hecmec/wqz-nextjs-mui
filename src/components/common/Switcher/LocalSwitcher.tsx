import { routing } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((currentLocale) => (
        <option key={currentLocale} value={currentLocale}>
          {t('locale', { locale: currentLocale })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
