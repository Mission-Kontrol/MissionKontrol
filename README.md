# Kuwinda

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

### Working with the dummy client database

If the dummy client database has been emptied for whatever reason, you can run the seeds to fill it again with:

```sh
make bash
bundle exec rake dummy_client_database:seeds
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
