FROM ruby:2.7.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client cron
RUN mkdir /app

WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem install bundler:2.2.9
RUN bundle config set path 'vendor/cache'
RUN bundle install
COPY . /app
COPY ./config/database.docker.yml ./config/database.yml

COPY scripts/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
