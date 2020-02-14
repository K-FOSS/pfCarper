// src/Tags.ts
import type { Droplet, Tag } from 'digitalocean-js';
import { config } from './Config';
import { digitalOcean } from './Library/digitalOcean';

let tag: Tag;
export async function getTag(): Promise<Tag> {
  if (!tag) {
    tag = await digitalOcean.tags.getTagByName(config.dropletTag)
  }

  return tag
}

export async function getTaggedDroplets(): Promise<Droplet[]> {
  return digitalOcean.droplets.getDropletsByTag(config.dropletTag)
}
