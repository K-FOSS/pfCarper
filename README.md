# pfCarper

pfCarper is a script designed to be run to test and automatically allocate a DigitalOcean floating IP to the next Droplet that the TCP Port test succeed

## Usage

**Envirnonment Variables**

| Variable              | Description                                                              | Default |
| :-------------------- | ------------------------------------------------------------------------ | ------- |
| `DIGITAL_OCEAN_TOKEN` | DigitalOcean API Token                                                   |         |
| `DROPLET_TAG`         | Tag applied to the droplets you want to have the floating IP assigned to |         |
| `FLOATING_IP`         | Floating IP Address to assign to droplets                                |         |
| `INTERVAL`            | Optional seconds interval at which to tcp test the droplets              | 5       |
| `PORT`                | Port to do the TCP test agaisnt                                          | 443     |

I designed this script to run in a `docker-compose.yml` file on one of my DigitalOcean VPSes.

```YAML
version: '3.7'

services:
  pfCarper:
    image: docker.pkg.github.com/k-foss/pfcarper/pfcarper
    environment:
      DIGITAL_OCEAN_TOKEN: 'INSERT_DIGITAL_OCEAN_TOKEN'
      FLOATING_IP: 'INSERT_FLOATING_IP'
      DROPLET_TAG: 'pfCarper-Core'
      # OPTIONAL
      # PORT: '80'
      # INTERVAL: '10'
```
