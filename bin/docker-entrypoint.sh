#!/bin/bash
shopt -s nullglob

echo
echo "==> Waiting for database to be ready. <=="
dockerize -wait tcp://${KUWINDA_DATABASE_HOST:-db}:${KUWINDA_DATABASE_PORT:-5432} \
          -timeout ${KUWINDA_DATABASE_TIMEOUT:-45s}

echo
echo "==> Checking if dependencies are satisfied. <=="
dockerize bundle check

if [[ $? == 0 ]]; then
    echo
    echo "==> Running database migrations. <=="
    dockerize bundle exec rails db:migrate

    # TODO: Set KUWINDA_DATABASE_SETUP to false when we are production ready
    if [[ $? != 0 && ${KUWINDA_DATABASE_SETUP:-true} == "true" ]]; then
        echo
        echo "==> Failed to migrate. Running setup first. <=="
        dockerize bundle exec rails db:setup
    fi
fi
echo

# If CMD starts with an option, prepend 'rails server'.
[[ "${1:0:1}" = '-' ]] \
    && set -- bundle exec rails server "$@"

# Set a default CMD, in case it wasn't provided.
[[ -z "$1" ]] \
    && set -- bundle exec rails server -p 3000 -b 0.0.0.0 "$@"

# If the command to execute is 'rails server', then force it to write the pid file
# into a non-shared container directory. Suddenly killing and removing app containers
# without this would leave a pidfile in the project's tmp dir, preventing the app
# container from starting up on further attempts.
[[ "$3" = "rails" && ("$4" = "s" || "$4" = "server") ]] \
    && set -- "$@" -P /tmp/server.pid

echo "==> Executing container start up command: \"$@\" <=="
exec "$@"

