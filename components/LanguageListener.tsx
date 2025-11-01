import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import i18next from 'i18next';
import { ESupportedLanguages } from '../languages/language.enums';

/**************************************
 ******** Language Listener ***********
 * Listens to language changes
 * and switchs app layout accordingly
 *************************************/
const LanguageListener = () => {
  useEffect(() => {
    const handleLanguageChange = async (lng: ESupportedLanguages) => {
      const rtlLanguages = [ESupportedLanguages.ARABIC]; // Add more RTL language codes as needed
      const isRTL = rtlLanguages.includes(lng);

      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);
    };

    // Add the event listener
    i18next.on('languageChanged', handleLanguageChange);

    // Clean up
    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LanguageListener;
