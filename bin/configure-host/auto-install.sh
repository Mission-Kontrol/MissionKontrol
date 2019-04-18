#!/bin/bash
#
# set -x
# set -o functrace
# set -e
#
# The basic directory structure:
export CFG_DIR="/opt/kuwinda"
export LOG_DIR="$CFG_DIR/logs"
export CMP_FILE="docker-compose.live.yml"
# Used doker images:
export CMP_IMAGE="docker/compose:1.24.0"
export DB_IMAGE="postgres:11.2-alpine"
export APP_IMAGE="camillavk/kuwinda:latest"

#
# Function definitions
#
function fulfill_dependencies() {
    #
    # Installs and configures dependencies: docker engine.
    #
    if [ -f /etc/os-release ]; then
        . /etc/os-release
    elif [ -f /etc/centos-release ]; then
        ID="centos"
        VERSION_ID="$(cat /etc/centos-release | tr -dc '0-9.'|cut -d \. -f1)"
    else
        echo -e " [\e[1;31mERRO\e[0m] :: Unsuported Linux distribution or version."
        exit 3
    fi

    local DOCKER_INSTALLED="false"
    local DOCKER_RUNNING="false"
    if [ -x "$(command -v docker)" ]; then
        DOCKER_INSTALLED="true"
        if docker ps >/dev/null 2>&1; then
            DOCKER_RUNNING="true"
        fi
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

    echo -e " [\e[1;37mINFO\e[0m] :: Server setup has been completed."
}

function gen_passwd() {
    #
    # Generates random password.
    #
    local size="$1"
    local chars="${2:-A-Za-z0-9}"
    head /dev/urandom | tr -dc $chars | head -c ${size:-8}
}

function configure_runtime() {
    #
    # Creates required configuration files.
    #
    mkdir -p $CFG_DIR $LOG_DIR

    # Create hidden files with env variables, if they do not exist.
    if [ ! -f $CFG_DIR/.db.env -o ! -f $CFG_DIR/.app.env ]; then
        local RANDOM_PASSWORD=$(gen_passwd 16)

        cat<<_EOF_ >$CFG_DIR/.db.env
POSTGRES_USER=kuwinda
POSTGRES_PASSWORD=$RANDOM_PASSWORD
_EOF_
        cat<<_EOF_ >$CFG_DIR/.app.env
KUWINDA_DATABASE_USER=kuwinda
KUWINDA_DATABASE_PASSWORD=$RANDOM_PASSWORD
KUWINDA_DATABASE_PORT=5432
KUWINDA_DATABASE_SETUP=true
KUWINDA_DATABASE_TIMEOUT=90s
_EOF_
        chmod 0600 $CFG_DIR/.db.env $CFG_DIR/.app.env
    fi

    # Create compose file, if it does not exist.
    if [ ! -f $CFG_DIR/$CMP_FILE -o "$1" == "force" ]; then
        cat<<_EOF_ >$CFG_DIR/$CMP_FILE
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
    networks:
      - internal
    ports:
      # TODO: Configure some webserver (with HTTPS?) on front of the app server
      - "3000:3000"
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - $LOG_DIR:/app/log

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
    VOLUMES="-v $CFG_DIR:$CFG_DIR -v $HOME/.docker:/root/.docker:ro"

    docker run $DOCKER_OPT $DOCKER_ADDR $COMPOSE_OPT $VOLUMES -w $CFG_DIR $CMP_IMAGE --log-level ERROR "$@"
}

function print_help() {
    echo -e "\n  $0 [command] [parameter]\n"
    echo -e "    Commands:\n"
    echo -e "       start                 : Starts application containers after verifying dependencies."
    echo -e "       stop                  : Stops application containers deployed previously."
    echo -e "       update                : Updates configuration and application containers."
    echo -e "       down                  : Removes application containers from server.\n"
    echo -e "    Parameters:\n"
    echo -e "       --force               : Used with 'update' command to force update of the configuration and application contaienrs."
    echo
    exit 1
}

#
# Main part of script - command line options
#
echo
if [ $(id -u) -ne 0 ]; then
    echo -e " [\e[1;31mERRO\e[0m] :: Script must be run with admin permission - as root user or with sudo\n"
    exit 2
fi

if [ $# -gt 0 ]; then
    echo -e " [\e[1;37mINFO\e[0m] :: Running command: $*"
    # Use one of the available options.
    case "$1" in
        down)   docker_compose down -v ;;
        start)
                echo -e " [\e[1;37mINFO\e[0m] :: Installing required dependencies."
                echo -e "           This may take a moment..."
                fulfill_dependencies
                echo -e " [\e[1;37mINFO\e[0m] :: Creating required configuration files."
                configure_runtime
                # TODO: Remove "docker login" after making app image publicly available
                docker login
                echo -e " [\e[1;37mINFO\e[0m] :: Downloading and starting application containers."
                echo -e "           This may take a moment..."
                docker_compose pull >/dev/null
                docker_compose up -d
                # TODO: Remove "docker logout" after making app image publicly available
                docker logout >/dev/null
                ;;
        stop)   docker_compose stop ;;
        update)
                if [ "$2" == "--force" ]; then
                    echo -e " [\e[1;37mINFO\e[0m] :: Installing required dependencies."
                    echo -e "           This may take a moment..."
                    fulfill_dependencies
                    echo -e " [\e[1;37mINFO\e[0m] :: Re-creating required configuration files."
                    configure_runtime force
                fi
                # TODO: Remove "docker login" after making app image publicly available
                docker login
                echo -e " [\e[1;37mINFO\e[0m] :: Updating application containers."
                echo -e "           This may take a moment..."
                docker_compose pull >/dev/null
                if [ $? -eq 0 ]; then
                    docker_compose up -d
                fi
                # TODO: Remove "docker logout" after making app image publicly available
                docker logout >/dev/null
                ;;
        *)      echo -e " [\e[1;33mWARN\e[0m] :: Undefined command."
    esac
    echo -e " [\e[1;37mINFO\e[0m] :: Command has been executed successfully."
else
    echo -e " [\e[1;33mWARN\e[0m] :: You need to specify command: start|stop|down|update"
    print_help
fi
echo
