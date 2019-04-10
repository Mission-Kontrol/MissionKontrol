FROM ruby:2.5.1

RUN apt-get update -qq \
    && apt-get install -yq \
        build-essential \
        libpq-dev \
        nodejs \
        firefox-esr=60.6.1esr-1~deb9u1 \
        chromium=73.0.3683.75-1~deb9u1 \
        unzip \
    \
# GeckoDriver v0.19.1
    && wget -q "https://github.com/mozilla/geckodriver/releases/download/v0.19.1/geckodriver-v0.19.1-linux64.tar.gz" -O /tmp/geckodriver.tgz \
    && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
    \
# chromeDriver v2.35
    && wget -q "https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ \
    \
# Slim down image
    && apt-get clean -qy \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/man/?? /usr/share/man/??_* \
    \
    && mkdir -p /app

WORKDIR /app
ENV BUNDLE_PATH /bundle
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install

EXPOSE 3000
