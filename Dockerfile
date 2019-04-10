FROM ruby:2.5.5

ENV CHROMEDRIVER_VERSION=2.35 \
    CHROMIUM_VERSION=73.0.3683.75-1~deb9u1 \
    FIREFOX_ESR_VERSION=60.6.1esr-1~deb9u1 \
    GECKODRIVER_VERSION=0.19.1 \
    BUNDLE_PATH=/bundle \
    BUNDLE_GEMFILE=/app/Gemfile \
    BUNDLE_APP_CONFIG=/usr/local/bundle

RUN apt-get update -qq \
    && apt-get install -yq \
        build-essential \
        libpq-dev \
        nodejs \
        firefox-esr=$FIREFOX_ESR_VERSION \
        chromium=$CHROMIUM_VERSION \
        unzip \
    \
# GeckoDriver v0.19.1
    && wget -q "https://github.com/mozilla/geckodriver/releases/download/v$GECKODRIVER_VERSION/geckodriver-v$GECKODRIVER_VERSION-linux64.tar.gz" -O /tmp/geckodriver.tgz \
    && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
    \
# chromeDriver
    && wget -q "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /usr/bin/ \
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

EXPOSE 3000
