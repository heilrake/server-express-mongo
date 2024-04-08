const VERIFY_ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

export const verifyEnvironmentServer = (): {
  isDevelopment: boolean;
  isProduction: boolean;
} => {
  // TODO adds logic for detect environment
  const isDevelopment = true;
  const isProduction = false;
  return { isDevelopment, isProduction };
};
