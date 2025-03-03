"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from logins.views import LoginView, CheckTokenView, CalendarEventList, BrotherLoginsView
from logins.admin import adminDash


urlpatterns = [
    path('admin/', adminDash.urls),
    path('api/login/', LoginView.as_view(), name='apiLogin'),
    path('api/checkAuth/', CheckTokenView.as_view(), name='checkAuth'),
    path('api/events/', CalendarEventList.as_view(), name='calendarEvents'),
    path('api/brotherLogins/', BrotherLoginsView.as_view(), name='brotherLogins'),
]

# admin.site.index_title = "Officer Dashboard"
# admin.site.site_header = "AEO Database Admin"
# admin.site.site_title = "AEO Database"
