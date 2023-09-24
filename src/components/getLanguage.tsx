import { Device } from '@capacitor/device';

const getLanguage = async () => {
  const {value} = await Device.getLanguageTag();
  return value || null;
};

export default getLanguage;
