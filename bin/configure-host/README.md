# Configure Host

Scripts that automate and simplify server configuration.

## Usage

1. Download the `auto-install.sh` script into any directory.
2. Give it executable permissions.
```bash
chmod +x auto-install.sh
```
3. Run as `root` or with `sudo`.
```bash
sudo ./auto-install.sh start
```

## Script Options

```bash
  sudo ./auto-install.sh --run --port 8080

       -r | --run                : Starts application containers after verifying dependencies.
       -s | --stop               : Stops application containers deployed on the server.

       -p | --port               : Allows to specify custom port on application will be exposed on host.
       -u | --update             : Updates configuration and application containers.
       -f | --force              : Used with '--update' option to force update of the configuration and application contaienrs.

       -d | --remove             : Removes application containers and configuration files from the server.

       -h | --help               : Prints this help message.
```

## Supported systems

The `auto-install.sh` script has been tested for the following Linux distributions:

* Ubuntu 16.04, 18.04
* Debian 8, 9
* CentOS 7
* Fedora 28, 29
* Amazon Linux OS 1 (2018.03), 2
* any OS with [pre-installed](https://docs.docker.com/install/) docker engine (CE or EE)
