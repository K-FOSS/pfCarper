// src/Library/digitalOcean.ts
import { DigitalOcean } from 'digitalocean-js';
import { config } from '../Config';

export const digitalOcean = new DigitalOcean(config.digitalOceanToken);
