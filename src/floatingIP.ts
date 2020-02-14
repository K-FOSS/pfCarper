// src/floatingIP.ts
import { FloatingIP } from 'digitalocean-js';
import { config } from './Config';
import { digitalOcean } from './Library/digitalOcean';
import { getTaggedDroplets } from './Tags';
import { testDroplet } from './tcpTest';
import { log } from './Library/log';

export async function getFloatingIP(): Promise<FloatingIP> {
  return digitalOcean.floatingIPs.getExistingFloatingIP(config.floatingIP);
}

export async function assignFloatingIPToAlive(): Promise<void> {
  log(`Assigning floating IP to next avaible droplet`);

  const taggedDroplets = await getTaggedDroplets();

  log(`Got tagged droplets, now looping until first up droplet`, 'info');

  for (const droplet of taggedDroplets) {
    const testResult = await testDroplet(droplet.id);
    if (testResult) {
      log(`Droplet tested successfully, assigning floating IP`);

      await assignFloatingIPToDroplet(droplet.id);
      break;
    }
  }
}

export async function assignFloatingIPToDroplet(
  dropletId: number,
): Promise<any> {
  log(`Assigning Floating IP to droplet: ${dropletId}`);

  await digitalOcean.floatingIPActions.assignFloatingIPToDroplet(
    config.floatingIP,
    `${dropletId}`,
  );
}
