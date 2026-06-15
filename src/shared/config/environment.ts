export const ENV = {
  API_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://api.morningful.ai'
      : 'http://localhost:42000',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  GOOGLE_ANALYTICS_ID: 'G-8DY1F31TH3',
  MIXPANEL_TOKEN: 'c53e4dfba1627a32fa34ef246f38fb80',
  MIXPANEL_BLOCKED_COUNTRIES: ['MK', 'IL'],
};

export const API_CONFIG = {
  BASE_URL: ENV.API_URL,
};

export const APP_CONFIG = {
  APP_NAME: 'Morningful AI',
  COMPANY_NAME: 'Morningful AI',
  LEGAL_NAME: 'Morningful Inc.',
  ADDRESS: 'San Francisco, California 94103',
  APP_URL: 'https://app.morningful.ai',
  COPYRIGHT_YEAR: new Date().getFullYear(),
  SOCIAL_LINKS: {
    FACEBOOK: '#',
    TWITTER: '#',
    LINKEDIN: 'https://www.linkedin.com/company/morningful',
  },
};
