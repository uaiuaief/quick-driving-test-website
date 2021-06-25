#!/bin/bash
DIR="/home/ubuntu/website"

cd $DIR/frontend
npm run build
cd $DIR
yes "yes" | $DIR/venv/bin/python3 manage.py collectstatic
