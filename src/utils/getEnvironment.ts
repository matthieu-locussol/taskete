export const getEnvironment = () => {
   const { VERCEL_ENV } = process.env;

   if (VERCEL_ENV === 'production') {
      return 'production';
   }

   if (VERCEL_ENV === 'preview') {
      return 'preview';
   }

   return 'development';
};

export const isProduction = () => getEnvironment() === 'production';
export const isPreview = () => getEnvironment() === 'preview';
export const isDevelopment = () => getEnvironment() === 'development';
