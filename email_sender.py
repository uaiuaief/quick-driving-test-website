import smtplib
import os
from django.conf import settings
from django.template import loader


#def send_email():
def _send_email(to, subject, body):
    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        sender = settings.EMAIL
        password = settings.EMAIL_PASSWORD
        receiver = sender

        smtp.login(sender, password)

        #subject = 'password reset'
        #body = 'test recover email'

        msg = f'subject: {subject}\n\n{body}'

        smtp.sendmail(sender, receiver, msg)



from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_password_recovery_email(receiver, user_name, link):
    subject = 'Reset your password'
    send_email(subject, receiver, 'password_recovery.html', {
        'name': user_name,
        'link': link
    })

def send_email(subject, receiver, template, params):
    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()

        sender = settings.EMAIL
        password = settings.EMAIL_PASSWORD
        receiver = sender

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


