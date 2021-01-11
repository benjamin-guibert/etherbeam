#!/bin/bash

set -e

echo "Environment: $RAILS_ENV"

bundle exec rake db:exists && bundle exec rake db:migrate || bundle exec rake db:setup
rm -f /app/tmp/pids/server.pid

exec "$@"
