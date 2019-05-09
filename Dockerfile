FROM ruby:2.5.1

ENV DEBIAN_FRONTEND=noninteractive\
    CHROMEDRIVER_VERSION=2.35 \
    CHROMIUM_VERSION=73.0.3683.75-1~deb9u1 \
    FIREFOX_ESR_VERSION=60.6.1esr-1~deb9u1 \
    GECKODRIVER_VERSION=0.19.1 \
    BUNDLE_PATH=/bundle \
    BUNDLE_GEMFILE=/app/Gemfile \
    BUNDLE_APP_CONFIG=/usr/local/bundle \
    DOCKERIZE_VERSION=v0.6.1

RUN apt-get -qq update \
    && apt-get -qq install -y \
        apt-transport-https \
        build-essential \
        libpq-dev \
        nodejs \
        firefox-esr=$FIREFOX_ESR_VERSION \
        chromium=$CHROMIUM_VERSION \
        unzip \
    \
# GeckoDriver
    && wget -q "https://github.com/mozilla/geckodriver/releases/download/v$GECKODRIVER_VERSION/geckodriver-v$GECKODRIVER_VERSION-linux64.tar.gz" -O /tmp/geckodriver.tgz \
    && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
    \
# ChromeDriver
    && wget -q "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ \
    \
# dockerize
    && wget -q "https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz" -O /tmp/dockerize.tar.gz \
    && tar -C /usr/local/bin -xzvf /tmp/dockerize.tar.gz \
    \
# webserver: nginx
    && wget -q -O - https://nginx.org/keys/nginx_signing.key | apt-key add - \
    && echo "deb https://nginx.org/packages/mainline/debian/ stretch nginx\ndeb-src https://nginx.org/packages/mainline/debian/ stretch nginx" > /etc/apt/sources.list.d/nginx.list \
    && apt-get -qq update && apt-get -qq install -y nginx \
    \
# Slim down image
    && apt-get clean -qy \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/man/?? /usr/share/man/??_* \
    \
    && mkdir -p /app

WORKDIR /app
# Install GEMS
COPY [ "Gemfile", "Gemfile.lock", "/app/" ]
RUN bundle check || bundle install

# Copy all of the required files into image
COPY [ ".", "/app/" ]

# Compile regular rails assets
RUN DB_ADAPTER=nulldb bundle exec rake assets:precompile

EXPOSE 3000
ENTRYPOINT [ "/app/bin/docker-entrypoint.sh" ]
