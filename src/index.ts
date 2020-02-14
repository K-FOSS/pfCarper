// src/index.ts
import { setInterval } from 'timers';
import { config } from './Config';
import { assignFloatingIPToAlive, getFloatingIP } from './floatingIP';
import { testDroplet } from './tcpTest';
import { log } from './Library/log';

log('Starting pfCarper');

setInterval(async () => {
  log('Getting Floating IP Information', 'info');

  const floatingIP = await getFloatingIP();
  if (!floatingIP) throw new Error('Floating IP Invalid');

  if (!floatingIP.droplet) {
    log(`Floating IP not currently assigned to a droplet`);
  } else {
    log(`Testing existing droplet for aliveness`, 'info');

    const testResult = await testDroplet(floatingIP.droplet.id);
    if (!!!testResult) {
      log('Test failed. Assign to next availble droplet');
      await assignFloatingIPToAlive();
    }
    log(`Test results: ${JSON.stringify(testResult)}`, 'info');
  }
}, config.interval * 1000);
