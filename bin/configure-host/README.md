# Configure Host

The Bash script that automate and simplify Kuwinda server configuration.

## Script Options

```bash
  sudo ./auto-install.sh --run --ports 8080:8443 --use_https

       -r | --run                : Starts application containers after verifying dependencies.
       -s | --stop               : Stops application containers deployed on the server temporarily.

       -p | --ports              : Allows to specify custom ports (HTTP and HTTPS) on which application will be exposed on host.
       -e | --use_https          : Allows to enable and enforce HTTPS with Web Server.
       -c | --ssl_cert           : Path to the SSL certificate file.
       -k | --ssl_cert_key       : Path to the SSL certificate key file.

       -u | --update             : Updates configuration and application containers.
       -f | --force              : Used with '--update' option to force update of the configuration and application contaienrs.

       -d | --remove             : Removes application containers and configuration files from the server.

       -h | --help               : Prints this help message.
```

**NOTE:** The script supports short (`-`) and long (`--`) options, which in most cases cane be used interchangeably at the same time. However, some systems do not support this, so in the case of problems with the use of the script you will need to try to use only short (`-`) or long (`--`) options.

## Usage

In the simplest case, to run the application containers using the script you need to provide one option - `-r`/`--run`. The script will run two containers on the given server and expose application from the host at port 80/tcp (HTTP).

1. Download the `auto-install.sh` script into any directory.
2. Give it executable permissions.
```bash
chmod +x auto-install.sh
```
3. Run as `root` or with `sudo`.
```bash
sudo ./auto-install.sh --run
# or
sudo ./auto-install.sh -r
```

A more advanced examples of use:

1. Launching the application container with enabled SSL/TLS encryption using self-signed certificate:
```bash
sudo ./auto-install.sh --run --use_https
# or
sudo ./auto-install.sh -r -e
```
2. Launching the application container with enabled SSL/TLS encryption using custom SSL certificate saved in local files and exposing it at custom ports:
```bash
sudo ./auto-install.sh --run --ports 8080:8443 --use_https --ssl_cert my_cert.pem --ssl_cert_key my_cert.key
# or
sudo ./auto-install.sh -r -p 8080:8443 -e -c my_cert.pem -k my_cert.key
```

## Supported systems

The `auto-install.sh` script has been tested for the following Linux distributions:

* Ubuntu 16.04, 18.04
* Debian 8, 9
* CentOS 7
* Fedora 28, 29
* Amazon Linux OS 1 (2018.03), 2
* any Linux OS with [pre-installed](https://docs.docker.com/install/) docker engine (CE or EE)
* Mac OS X with [pre-installed](https://docs.docker.com/docker-for-mac/install/) docker engine (CE or EE)
