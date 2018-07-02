FROM ruby:2.5

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir -p /app

WORKDIR /app
ENV BUNDLE_PATH /bundle
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install

EXPOSE 3000
