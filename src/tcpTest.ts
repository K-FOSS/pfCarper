// src/tcpTest.ts
import isReachable from 'is-reachable';
import { config } from './Config';
import { getDroplet } from './Droplet';

export async function testDroplet(dropletId: number): Promise<boolean> {
  console.debug(
    `Testing tcp port ${config.tcpPort} on dropletId: ${dropletId}.`,
  );

  const droplet = await getDroplet(dropletId);

  const dropletIPAddress = droplet.networks?.v4[0].ip_address;
  if (!dropletIPAddress) {
    throw new Error(`INVALID DROPLET_IPv4\nDropletId: ${dropletId}`);
  }

  return isReachable(`${dropletIPAddress}:${config.tcpPort}`);
}
