// src/Droplet.ts
import { Droplet } from 'digitalocean-js';
import { digitalOcean } from './Library/digitalOcean';

const dropletCache: Map<number, Droplet> = new Map();

export async function getDroplet(dropletId: number): Promise<Droplet> {
  let droplet = dropletCache.get(dropletId);

  if (!droplet) {
    droplet = await digitalOcean.droplets.getExistingDroplet(dropletId);

    dropletCache.set(dropletId, droplet);
  }

  return droplet;
}
