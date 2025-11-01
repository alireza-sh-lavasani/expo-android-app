import { useRealm } from '@realm/react';
import { ESupportedLanguages } from '../languages/language.enums';
import { AppLanguage } from '../models/app-language';

export const useLanguageService = () => {
  const realm = useRealm();

  // Set the app's current language
  const setAppLanguage = (language: ESupportedLanguages): void => {
    try {
      const appLanguage = getAppLanguage(); // Get the app's current language

      // Update the language
      if (appLanguage) {
        realm.write(() => {
          appLanguage.language = language;
          appLanguage.updatedAt = new Date();
        });

        console.log('Lanugage updated successfully!');
      }
      // Set the intial language
      else {
        realm.write(() => {
          const createdLanguage = realm.create('AppLanguage', language);
          return createdLanguage;
        });

        console.log('Lanugage created successfully!');
      }
    } catch (error) {
      console.error('Error creating language:', error);
    }
  };

  // Get the app's current language
  const getAppLanguage = (): AppLanguage | null | undefined => {
    try {
      const languages = Array.from(
        realm.objects<AppLanguage>('AppLanguage').slice()
      );

      return languages.length ? languages[0] : null;
    } catch (error) {
      console.error('Error getting app language:', error);
    }
  };

  return {
    setAppLanguage,
    appLanguage: getAppLanguage()?.language,
  };
};
