// src/Config.ts

if (process.env.NODE_ENV !== 'production') {
  const { config } = await import('dotenv');
  config();
}

export const config = {
  dropsToken: process.env.DIGITAL_OCEAN_TOKEN!,
  primaryIP: process.env.PRIMARY_IP!,
  secondaryIP: process.env.SECONDARY_IP!,
  floatingIP: process.env.FLOATING_IP!,
};
