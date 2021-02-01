[![Open Source Helpers](https://www.codetriage.com/mission-kontrol/missionkontrol/badges/users.svg)](https://www.codetriage.com/mission-kontrol/missionkontrol)

# MissionKontrol
MissionKontrol is an admin panel that allows users to CRUD data in one or more databases. The app has its own database that is used to store configuration and comments. Databases that you connect to are updated directly. 

The separate [missionkontrol relay rails gem](https://github.com/Mission-Kontrol/MissionKontrol-rails) improves write/update/delete validations. We are looking at adding the ability to update via webhook/API.

![crud table](https://www.missionkontrol.io/wp-content/uploads/2021/01/tables.png)


## Key features
- CRUD tables w/serverside search
- Drag & Drop views
- Automated task queues
- RBAC permissions system

## Product documentation
Full documentation can be found here: https://www.missionkontrol.io

## Quickstart

In order to get your development environment up and running, simply follow these steps.

1. Install Docker
2. Boot up docker with `make start`
3. Jump into docker with `make bash`
4. Install rails dependencies with `bundle install`
5. Setup database with `bundle exec rails db:setup`
6. Test it works by running the server `bundle exec rails s`

## Developing

Below is a guide to common development tasks you'll probably need whilst working on this application.

Before running any of these commands, you need to make sure Docker is running with the following:
 
```sh
make start
```

If Docker is running but it doesn't seem to be working, you can follow the [advice below](#working-with-docker).

### Running development server

```sh
make bash
bundle exec rails s
```

### Running tests

To run all tests, you can do the following:

```sh
make bash
bundle exec rspec
```

If you want to run a particular test:

```sh
make bash
bundle exec rspec spec/path/to_my_spec.rb
```

### Working with the database

Creating a migration and running it:

```sh
make bash
bundle exec rails g migration CreateProducts name:string
bundle exec rails db:migrate
```

Recreating the database:

```sh
make bash
bundle exec rails db:reset
```

### Working with Docker

#### Starting Docker

To setup Docker for the first time use the start command. It's safe to run multiple times.

```sh
make start
```

#### Stopping Docker

If you want to stop your containers to save your battery or CPU you can run the following stop command.

```sh
make stop
```

#### Restarting Docker

If you want to do a non-destructive restart, just to kick the tires a little, then you can use the restart command.

```sh
make restart
```

#### Starting from scratch (when things go really wrong)

When things go wrong or you stop working on this application, you may want to tear down the Docker setup. You can use this command:

```sh
make clean
```

If things have gone wrong and you want to start from scratch, you can restart the whole setup:

```sh
make clean
make start
make bash
bundle install
bundle exec rails db:setup
```

### Environment variables

There are several environment variables that can be used to modify the operation of the application and its containers.

* `KUWINDA_DATABASE_HOST` - specifies the address of the database server;
* `KUWINDA_DATABASE_PORT` - specifies the database server port (default value: `5432`);
* `KUWINDA_DATABASE_USER` - specifies the name of the database user;
* `KUWINDA_DATABASE_PASSWORD` - specifies the password of the database user;
* `KUWINDA_DATABASE_TIMEOUT` - configures the maximum waiting time for the database server to become available (default value: `42s`);
* `KUWINDA_DATABASE_SETUP` - indicates whether database will be created from scratch (default value: `true`);

* `PORT` - specifies the port of the application server (default value: `3000`);
* `WEB_CONCURRENCY` - specifies the number of `workers` (forked webserver processes) to boot in clustered mode.
* `RAILS_MAX_THREADS` - specifies the number of `threads` each of workers will use under the hood (default value: `5`);
* `RAILS_ENV` - specifies the application `environment` (default value: `development`);

* `RAILS_MASTER_KEY` - key used to decrypt encrypted `credentials.yml.enc` file;
* `RAILS_SERVE_STATIC_FILES` - allows to offload serving static files to Apache or NGINX web server;
* `RAILS_LOG_TO_STDOUT` - enables sending logs of the `production` environment to `STDOUT`.

NGINX Web Server configuration:

* `WEB_SERVER_ENABLE` - enables and runs the nginx when the containers is started;
* `WEB_SERVER_USE_HTTPS` - enables HTTPS port on the web server;
* `WEB_SERVER_PORT` - allows to override the default HTTP port - `80/tcp`;
* `WEB_SERVER_HTTPS_PORT` - allows to override the default HTTPS port - `443/tcp`;
* `WEB_SERVER_STATIC_FILES` - enables serving static files by web server - should be used in combination with `RAILS_ENV=production` and `RAILS_SERVE_STATIC_FILES=true`.
