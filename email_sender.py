import smtplib
from django.conf import settings


#def send_email():
def send_email(to, subject, body):
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

    
        

