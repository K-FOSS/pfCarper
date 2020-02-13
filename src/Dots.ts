// src/Dots.ts
// Carper/src/Dots.ts
import { createApiClient } from 'dots-wrapper';
import { config } from './Config';

export const dots = createApiClient({ token: config.dropsToken });
