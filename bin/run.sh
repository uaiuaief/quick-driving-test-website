#!/bin/bash
~/website/venv/bin/gunicorn -c conf/gunicorn_config.py quick_driving_test.wsgi
