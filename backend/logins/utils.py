from .models import GmailToken

def get_gmail_token():
    """
    Fetch the first GmailToken object from the database.
    In a real application, you might have one token per user or per app.
    """
    try:
        return GmailToken.objects.first()  # or filter by some criteria if needed
    except GmailToken.DoesNotExist:
        return None

def update_gmail_token(new_access_token, new_refresh_token):
    """
    Update the GmailToken in the database with new values.
    If no token exists, create one.
    """
    token_obj = get_gmail_token()
    if token_obj:
        token_obj.access_token = new_access_token
        token_obj.refresh_token = new_refresh_token
        token_obj.save()
    else:
        from django.conf import settings
        GmailToken.objects.create(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
        )
