#!/bin/sh
set -eu

PORT="${PORT:-80}"

sed "s/__PORT__/${PORT}/g" /etc/apache2/ports.conf.template > /etc/apache2/ports.conf
sed "s/__PORT__/${PORT}/g" /etc/apache2/sites-available/000-default.conf.template > /etc/apache2/sites-available/000-default.conf

exec apache2-foreground
