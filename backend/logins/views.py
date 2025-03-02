from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CalendarEvent, login
from .serializer import CalendarEventSerializer, LoginSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        # Retrieve the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')
        

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Get or create a token for the authenticated user
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class CheckTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        return Response({
            'status': 'Token is valid'
        })

class CalendarEventList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        events = CalendarEvent.objects.all()
        serializer = CalendarEventSerializer(events, many=True)
        print(serializer.data)
        return Response(serializer.data)

class BrotherLoginsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        userGroups = user.groups.all()

        if not userGroups.exists():
            print("no user groups!")
            return Response({"error: No roles assigned"}, status=403)

        logins = login.objects.filter(groups__in=userGroups).distinct()
        serializer = LoginSerializer(logins, many=True)
        return Response(serializer.data)
