// src/index.ts
import { setInterval } from 'timers';
import { config } from './Config';
import { assignFloatingIPToAlive, getFloatingIP } from './floatingIP';
import { testDroplet } from './tcpTest';

console.debug('Starting pfCarper');

setInterval(async () => {
  console.debug('Getting Floating IP Information');

  const floatingIP = await getFloatingIP();
  if (!floatingIP) throw new Error('Floating IP Invalid');

  if (!floatingIP.droplet) {
    console.debug(`Floating IP not currently assigned to a droplet`);
  } else {
    console.debug(`Testing existing droplet for aliveness`);

    const testResult = await testDroplet(floatingIP.droplet.id);
    if (!!!testResult) {
      console.log('Test failed. Assign to next availble droplet');
      await assignFloatingIPToAlive();
    }
    console.log(`Test results: `, testResult);
  }
}, config.interval * 1000);
