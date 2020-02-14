// src/Config.ts
if (process.env.NODE_ENV !== 'production') {
  const { config } = await import('dotenv');
  config();
}

export const config = {
  digitalOceanToken: process.env.DIGITAL_OCEAN_TOKEN!,
  dropletTag: process.env.DROPLET_TAG!,
  floatingIP: process.env.FLOATING_IP!,
  interval: parseInt(process.env.INTERVAL || '5'),
  tcpPort: parseInt(process.env.PORT || '443'),
};
