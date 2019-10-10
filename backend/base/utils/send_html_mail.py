from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_html_mail(email_template_name, subject, recipient_list, context={}):
    from_email = 'crested myna administrator'
    html_content = render_to_string(email_template_name, context)
    text_content = strip_tags(html_content)
    msg = EmailMultiAlternatives(subject,
                                 text_content,
                                 from_email,
                                 recipient_list
                                 )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
