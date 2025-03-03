from django.db import models
from django.contrib.auth.models import Group

class login(models.Model):

    title = models.CharField(max_length=100)
    username = models.CharField(max_length=100, null=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=100, null=True)
    groups = models.ManyToManyField(Group, null=True, blank=True)

    def __str__(self):
        return self.title

class CalendarEvent(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    allDay = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Poll(models.Model):
    title = models.CharField(max_length=255)
    allow_multiple = models.BooleanField(default=False, help_text="Allow multiple selections if True.")

    def __str__(self):
        return self.title

class Choice(models.Model):
    poll = models.ForeignKey(Poll, related_name='choices', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=255)
    vote_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.choice_text} ({self.vote_count} votes)"

class GmailToken(models.Model):
    access_token = models.CharField(max_length=512)
    refresh_token = models.CharField(max_length=512)

    def __str__(self):
        return f"GmailToken for Client: {self.client_id}"