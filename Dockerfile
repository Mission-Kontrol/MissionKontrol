FROM ruby:2.5

RUN apt-get update -qq && apt-get install -yq \
  build-essential \
  libpq-dev \
  nodejs \
  firefox-esr=60.3.0esr-1~deb9u1 \
  chromium=70.0.3538.110-1~deb9u1 \
  unzip

# GeckoDriver v0.19.1
RUN wget -q "https://github.com/mozilla/geckodriver/releases/download/v0.19.1/geckodriver-v0.19.1-linux64.tar.gz" -O /tmp/geckodriver.tgz \
    && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
    && rm /tmp/geckodriver.tgz

# chromeDriver v2.35
RUN wget -q "https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ \
    && rm /tmp/chromedriver.zip

RUN mkdir -p /app

WORKDIR /app
ENV BUNDLE_PATH /bundle
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install

EXPOSE 3000
