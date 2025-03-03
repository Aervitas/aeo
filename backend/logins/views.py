import base64
import os
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CalendarEvent, login
from .serializer import CalendarEventSerializer, LoginSerializer
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from dotenv import load_dotenv
from .utils import get_gmail_token, update_gmail_token


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

class getOTPView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        load_dotenv()
        tokens = get_gmail_token()
        access_token = tokens.access_token
        refresh_token = tokens.refresh_token
        token_uri = os.environ.get("GMAIL_TOKEN_URI")
        client_id = os.environ.get("GMAIL_CLIENT_ID")
        client_secret = os.environ.get("GMAIL_CLIENT_SECRET")
        
        print(refresh_token)
        print(access_token)

        creds = Credentials(
            token=access_token,
            refresh_token=refresh_token,
            token_uri=token_uri,
            client_id=client_id,
            client_secret=client_secret,
        )

        if creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
                update_gmail_token(creds.token, creds.refresh_token)
            except Exception as refresh_error:
                return Response({'error': f"Failed to refresh token: {str(refresh_error)}"}, status=500)

        try:
            service = build('gmail', 'v1', credentials=creds)
            query = 'subject:"Your ChatGPT code is"'
            result = service.users().messages().list(
                userId = 'me',
                labelIds=['INBOX'],
                q=query,
                maxResults = 1
            ).execute()

            messages = result.get('messages', [])
            if not messages:
                return JsonResponse({'error': 'No OTP in recent inbox'}, status = 404)

            messageId = messages[0]['id']
            message = service.users().messages().get(
                userId='me',
                id=messageId,
                format='metadata',
                metadataHeaders=['Subject']
            ).execute()

            headers = message.get('payload', {}).get('headers', [])
            subject = next((h['value'] for h in headers if h['name'] == 'Subject'), None)

            if subject is None:
                return Response({'error': 'Subject header not found'}, status=404)
            return Response({'subject' : subject})
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)