import smtplib
import os
import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.conf import settings
from django.utils import timezone
from django.template import loader


def send_simple_email(receiver, subject, body):
    with smtplib.SMTP('smtpout.secureserver.net', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        sender = settings.EMAIL
        password = settings.EMAIL_PASSWORD
        smtp.login(sender, password)

        msg = f'subject: {subject}\n\n{body}'

        smtp.sendmail(sender, receiver, msg)

def send_email(subject, receiver, template, params):
    with smtplib.SMTP('smtpout.secureserver.net', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        sender = settings.EMAIL
        password = settings.EMAIL_PASSWORD

        smtp.login(sender, password)

        body = loader.render_to_string(template, params)

        msg = MIMEMultipart()
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = receiver
        msg.attach(MIMEText(body, "html"))
        msg_body = msg.as_string()

        #msg = f'subject: {subject}\n\n{body}'

        smtp.sendmail(sender, receiver, msg_body)

def send_password_recovery_email(receiver, user_name, link):
    subject = 'Reset your password'
    send_email(subject, receiver, 'password_recovery.html', {
        'header': "Reset Password",
        'name': user_name,
        'link': link
    })

def profile_update_required_email(receiver, user_name):
    subject = 'Action required'
    send_email(subject, receiver, 'profile_update_required.html', {
        'header': "Please Update your profile!",
        'name': user_name,
        'link': f"{settings.DOMAIN_NAME}/account"
    })

def test_found_email(receiver, user_name, test_time, test_date, test_center):
    subject = "We've found your new test!"
    send_email(subject, receiver, 'test_found.html', {
        'header': "We've found your new test!",
        'name': user_name,
        'date_found': timezone.now().date().strftime("%d-%m-%Y"),
        'test_time': test_time,
        'test_date': test_date,
        'test_center': test_center,
    })

def welcome_email(receiver, user_name):
    subject = f"Welcome {user_name}"
    send_email(subject, receiver, 'welcome_email.html', {
        'header': f"Welcome {user_name}",
        'link': f"{settings.DOMAIN_NAME}/account"
    })

