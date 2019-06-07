#!/bin/bash
#
# set -x
# set -o functrace
set -e
#
# The basic directory structure:
case "$(echo "$(uname)" | awk '{print tolower($0)}')" in
    darwin) CFG_DIR="/Users/kuwinda" ;;
    linux) CFG_DIR="/opt/.kuwinda" ;;
esac
export CFG_DIR
export LOG_DIR="$CFG_DIR/logs"
export SSL_DIR="$CFG_DIR/ssl"
export CMP_FILE="docker-compose.live.yml"
# Used doker images:
export CMP_IMAGE="docker/compose:1.24.0"
export DB_IMAGE="postgres:11.2-alpine"
export APP_IMAGE="kuwinda/kuwinda:latest"

#
# Function definitions
#
function fulfill_dependencies() {
    #
    # Installs and configures dependencies: docker engine.
    #
    local DOCKER_INSTALLED="false"
    local DOCKER_RUNNING="false"
    if [ -x "$(command -v docker)" ]; then
        DOCKER_INSTALLED="true"
        if docker ps >/dev/null 2>&1; then
            echo -e " [\e[1;37mINFO\e[0m] :: Docker engine is already installed and configured."
            return 0
        fi
    else
        echo -e " [\e[1;37mINFO\e[0m] :: Installing required dependencies."
        echo -e "           This may take a moment..."
    fi

    case "$(echo "$(uname)" | awk '{print tolower($0)}')" in
        darwin)
            echo -e " [\e[1;37mINFO\e[0m] :: Docker engine for Mac OS X must be installed manually."
            echo -e "           Follow instructions available at https://docs.docker.com/docker-for-mac/install/"
            exit 6
            ;;
        linux)
            if [ -f /etc/os-release ]; then
                . /etc/os-release
            elif [ -f /etc/centos-release ]; then
                ID="centos"
                VERSION_ID="$(cat /etc/centos-release | tr -dc '0-9.'|cut -d \. -f1)"
            else
                echo -e " [\e[1;31mERRO\e[0m] :: Unsuported Linux distribution or version."
                echo -e " [\e[1;33mWARN\e[0m] :: You must first install the docker engine manually."
                exit 3
            fi
            case "$ID" in
                ubuntu|debian)
                    if [ "$DOCKER_INSTALLED" != "true" ]; then
                        apt-get -qq update
                        apt-get -qq install -y \
                            apt-transport-https \
                            ca-certificates \
                            curl \
                            gnupg-agent \
                            software-properties-common >/dev/null
                        curl -fsSL https://download.docker.com/linux/$ID/gpg \
                          | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn apt-key add - >/dev/null
                        add-apt-repository -y \
                            "deb [arch=amd64] https://download.docker.com/linux/$ID \
                            $(lsb_release -cs) stable" >/dev/null
                        apt-get -qq update

                        PKG="docker-ce docker-ce-cli containerd.io"
                        if [ "$ID" == "debian" -a "$VERSION_ID" == "8" ]; then
                            PKG="docker-ce"
                        fi
                        apt-get -qq install -y $PKG >/dev/null
                    fi
                    if [ "$DOCKER_RUNNING" != "true" ]; then
                        case "$VERSION_ID" in
                            16.04|18.04|8|9)
                                systemctl -q enable docker.service
                                systemctl -q start docker.service
                                ;;
                        esac
                    fi
                    ;;
                centos)
                    if [ "$DOCKER_INSTALLED" != "true" ]; then
                        yum install -y -q \
                            yum-utils \
                            device-mapper-persistent-data \
                            lvm2
                        yum-config-manager -y -q --add-repo \
                            https://download.docker.com/linux/$ID/docker-ce.repo
                        yum install -y -q docker-ce docker-ce-cli containerd.io
                    fi
                    if [ "$DOCKER_RUNNING" != "true" ]; then
                        case "$VERSION_ID" in
                            7)
                                systemctl -q enable docker.service
                                systemctl -q start docker.service
                                ;;
                            6)
                                chkconfig docker on >/dev/null
                                service docker start >/dev/null
                                ;;
                        esac
                    fi
                    ;;
                fedora)
                    if [ "$DOCKER_INSTALLED" != "true" ]; then
                        dnf install -y -q dnf-plugins-core
                        dnf config-manager -y --add-repo \
                            https://download.docker.com/linux/$ID/docker-ce.repo
                        dnf install -y -q docker-ce docker-ce-cli containerd.io
                    fi
                    if [ "$DOCKER_RUNNING" != "true" ]; then
                        case "$VERSION_ID" in
                            28|29)
                                systemctl -q enable docker.service
                                systemctl -q start docker.service
                                ;;
                        esac
                    fi
                    ;;
                amzn)
                    if [ "$DOCKER_INSTALLED" != "true" ]; then
                        case "$VERSION_ID" in
                            2) amazon-linux-extras install -y docker >/dev/null; ;;
                            2018.03) yum install -y -q docker
                        esac
                    fi
                    if [ "$DOCKER_RUNNING" != "true" ]; then
                        case "$VERSION_ID" in
                            2)
                                systemctl -q enable docker.service
                                systemctl -q start docker.service
                                ;;
                            2018.03)
                                chkconfig docker on >/dev/null
                                service docker start >/dev/null
                                ;;
                        esac
                    fi
            esac
            ;;
    esac

    echo -e " [\e[1;37mINFO\e[0m] :: Server setup has been completed."
}

function gen_passwd() {
    #
    # Generates random password.
    #
    local size="$1"
    local chars="${2:-A-Za-z0-9}"
    case "$(echo "$(uname)" | awk '{print tolower($0)}')" in
        darwin) openssl rand -base64 $size ;;
        linux) head /dev/urandom | env LC_CTYPE=C tr -dc $chars | head -c ${size:-8}; echo ;;
    esac
}

function configure_runtime() {
    #
    # Creates required configuration files.
    #
    mkdir -p "$CFG_DIR" "$LOG_DIR" "$SSL_DIR"
    [[ -n "$SSL_CERT_FILE" ]] && { cp -af "$SSL_CERT_FILE" "$SSL_DIR/certificate.pem"; chmod 0400 "$SSL_DIR/certificate.pem"; }
    [[ -n "$SSL_CERT_KEY" ]] && { cp -af "$SSL_CERT_KEY" "$SSL_DIR/private.key"; chmod 0400 "$SSL_DIR/private.key"; }

    [[ "$EXPOSE_PORT" =~ ^(.*):(.*)$ ]] || EXPOSE_PORT="80:443"
    local HTTP_PORT=${EXPOSE_PORT%%:*}
    local HTTPS_PORT=${EXPOSE_PORT##*:}

    echo -e " [\e[1;37mINFO\e[0m] :: Creating configuration files."
    # Create hidden files with env variables, if they do not exist.
    if [ ! -f "$CFG_DIR/.db.env" -o ! -f "$CFG_DIR/.app.env" ]; then
        local RANDOM_PASSWORD=$(gen_passwd 12)

        cat<<_EOF_ >"$CFG_DIR/.db.env"
POSTGRES_USER=kuwinda
POSTGRES_PASSWORD=$RANDOM_PASSWORD
_EOF_
        cat<<_EOF_ >"$CFG_DIR/.app.env"
KUWINDA_DATABASE_USER=kuwinda
KUWINDA_DATABASE_PASSWORD=$RANDOM_PASSWORD
KUWINDA_DATABASE_PORT=5432
KUWINDA_DATABASE_SETUP=true
KUWINDA_DATABASE_TIMEOUT=90s
_EOF_
        chmod 0644 "$CFG_DIR/.db.env" "$CFG_DIR/.app.env"
    fi

    # Create compose file, if it does not exist.
    if [ ! -f "$CFG_DIR/$CMP_FILE" -o "${FORCE_UPDATE:-no}" == "yes" ]; then
        cat<<_EOF_ >"$CFG_DIR/$CMP_FILE"
version: '2'

services:
  db:
    image: $DB_IMAGE
    env_file:
      - $CFG_DIR/.db.env
    networks:
      - internal
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - postgres-data:/var/lib/postgresql/data
    restart: always

  web:
    image: $APP_IMAGE
    command: bundle exec puma -b tcp://0.0.0.0:3000 --pidfile /tmp/server.pid
    depends_on:
      - db
    env_file:
      - $CFG_DIR/.app.env
    environment:
      KUWINDA_DATABASE_HOST: db
      WEB_SERVER_ENABLE: "true"
      WEB_SERVER_PORT: $HTTP_PORT
      WEB_SERVER_HTTPS_PORT: $HTTPS_PORT
      WEB_SERVER_USE_HTTPS: "${WEB_SERVER_USE_HTTPS:-false}"
      LAUNCH_TIMESTAMP: "$(date +%s)"
    networks:
      - internal
    ports:
      - "${HTTP_PORT}:${HTTP_PORT}"
      - "${HTTPS_PORT}:${HTTPS_PORT}"
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - $LOG_DIR:/app/log
      - $SSL_DIR:/etc/nginx/ssl

volumes:
  postgres-data:

networks:
  internal:
    ipam:
      driver: default
      config:
        - subnet: 172.16.0.0/28
_EOF_
    fi

    echo -e " [\e[1;37mINFO\e[0m] :: Configuration files has been created."
}

function docker_compose() {
    #
    # Runs docker-compose inside a temporary container.
    #
    docker pull $CMP_IMAGE >/dev/null

    DOCKER_HOST="/var/run/docker.sock"
    DOCKER_ADDR="-v $DOCKER_HOST:$DOCKER_HOST -e DOCKER_HOST=unix://$DOCKER_HOST"
    DOCKER_OPT="--rm -it"
    COMPOSE_OPT="-e COMPOSE_FILE=$CMP_FILE"
    VOLUMES="-v $HOME/.docker:/root/.docker:ro"

    if [ "$CLEAN_START" == "yes" -o -f "$CFG_DIR/$CMP_FILE" ]; then
        docker run \
            $DOCKER_OPT $DOCKER_ADDR $COMPOSE_OPT $VOLUMES \
            -v "$CFG_DIR":"$CFG_DIR" -w "$CFG_DIR" \
            $CMP_IMAGE --log-level ERROR "$@" >/dev/null
    else
        echo -e " [\e[1;33mWARN\e[0m] :: It seems that the configuration is missing."
        echo -e " [\e[1;37mINFO\e[0m] :: Try to run setup first.\n"
        exit 5
    fi
}

function print_help() {
    echo -e "  sudo $0 --run --port 8080:8443\n"
    echo -e "       -r | --run                : Runs setup of the server and application containers."
    echo -e "       -s | --stop               : Stops application containers deployed on the server.\n"
    echo -e "       -p | --ports              : Allows to specify custom ports (HTTP and HTTPS) on which application will be exposed on host."
    echo -e "       -e | --use_https          : Allows to enable and enforce HTTPS with Web Server."
    echo -e "       -c | --ssl_cert           : Path to the SSL certificate file."
    echo -e "       -k | --ssl_cert_key       : Path to the SSL certificate key file.\n"
    echo -e "       -u | --update             : Updates configuration and application containers."
    echo -e "       -f | --force              : Used with '--update' option to force update of the configuration and application contaienrs.\n"
    echo -e "       -d | --remove             : Removes application containers and configuration files from the server.\n"
    echo -e "       -h | --help               : Prints this help message.\n"
    exit 1
}

#
# Main part of script - command line options
#
echo
shortOptions='c:defhk:p:rsu'
longOptions='force,help,ports:,remove,run,ssl_cert:,ssl_cert_key:,stop,update,use_https'

set +e
getopt -T > /dev/null
if [ $? -eq 4 ]; then
    # GNU enhanced getopt is available
    ARGS=$(getopt --name "${0##*/}" -o $shortOptions -l $longOptions -n 'parse-options' -- "$@" 2>/dev/null)
else
    # Original getopt is available (no long option names, no whitespace, no sorting)
    ARGS=$(getopt $shortOptions "$@" 2>/dev/null)
fi
[ $? -ne 0 -o $# -eq 0 ] && print_help
set -e

eval set -- $ARGS

while [ $# -gt 0 ]; do
    case "$1" in
        -d | --remove)        CMD="remove" ;;
        -f | --force)         export FORCE_UPDATE="yes" ;;
        -h | --help)          print_help ;;
        -p | --ports)         export EXPOSE_PORT="$2" ;;
        -r | --run)           CMD="run"; [ ! -f "$CFG_DIR/$CMP_FILE" ] && export CLEAN_START="yes" ;;
        -c | --ssl_cert)      export SSL_CERT_FILE=$(readlink -f "$2") ;;
        -k | --ssl_cert_key)  export SSL_CERT_KEY=$(readlink -f "$2") ;;
        -s | --stop)          CMD="stop" ;;
        -u | --update)        CMD="update"; export SERVICE_UPDATE="yes" ;;
        -e | --use_https)     export WEB_SERVER_USE_HTTPS="true" ;;
        --)                   shift; break ;;
    esac
    shift
done

if [ $(id -u) -ne 0 ]; then
    echo -e " [\e[1;31mERRO\e[0m] :: Script must be run with admin permission - as root user or with sudo\n"
    exit 2
fi
if [ -n "$CMD" ]; then
    echo -e " [\e[1;37mINFO\e[0m] :: Executing '$CMD' command..."
    if [ "$CMD" == "run" -o "$CMD" == "update" ]; then
        if [ "$CLEAN_START" == "yes" ] || [ "$CMD" == "update" -a "$FORCE_UPDATE" == "yes" ]; then
            fulfill_dependencies
            configure_runtime
        fi
        echo -e " [\e[1;37mINFO\e[0m] :: Downloading and starting application containers."
        if [ "$CLEAN_START" == "yes" -o "$CMD" == "update" ]; then
            echo -e "           This may take a moment..."
            docker_compose pull
        fi
        if [ $? -eq 0 ]; then
            docker_compose up -d
        else
            echo -e " [\e[1;31mERRO\e[0m] :: An error has been encountered while downloading application image."
            echo -e " [\e[1;37mINFO\e[0m] :: Please try again."
            exit 4
        fi
    elif [ "$CMD" == "remove" ]; then
        docker_compose down -v
        rm -rf "$CFG_DIR"
    elif [ "$CMD" == "stop" ]; then
        docker_compose stop
    fi
else
    echo -e " [\e[1;31mERRO\e[0m] :: Undefined command. Check the parameters passed to the script.\n"
    print_help
fi
echo -e " [\e[1;37mINFO\e[0m] :: Command has been executed successfully."
echo
