# logins/admin.py

from django.contrib.admin import AdminSite
from django.contrib import admin
from django.contrib.auth.models import User, Group
from .models import login, CalendarEvent, Poll, Choice

class LoginsAdminSite(AdminSite):
    site_header = 'Logins Administration'
    site_title = 'Logins Admin Portal'
    index_title = 'Welcome to the Logins Admin Dashboard'

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1

class PollAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ('title', 'allow_multiple')

admin.site.register(Poll, PollAdmin)
# Create an instance of the custom admin site
adminDash = LoginsAdminSite(name='admin')

adminDash.register(User)
adminDash.register(Group)
adminDash.register(login)
adminDash.register(CalendarEvent)
adminDash.register(Poll, PollAdmin)
adminDash.register(Choice)
