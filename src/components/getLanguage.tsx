import { Device } from '@capacitor/device';

const getLanguage = async () => {
  const {value = 'en'} = await Device.getLanguageTag();
  return value;
};

export default getLanguage;
