from django.shortcuts import render
from .models import Cours, User, Commentaires
from .serializers import CoursSerializer, UserSerializer, CommentaireSerializer
from django.contrib.auth import authenticate
from django.http import FileResponse
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class CoursViewSet(viewsets.ModelViewSet):
    queryset = Cours.objects.all()
    serializer_class = CoursSerializer

    
    
    @action(detail=True, methods=["GET"])
    def download(self, request, pk=None):
        cours = self.get_object()
        if not cours.contenu:
            return Response(
                {"error": "Ce cours n'a pas de contenu à télécharger."},
                status=status.HTTP_404_NOT_FOUND,
            )

        response = FileResponse(cours.contenu)
        response["Content-Disposition"] = f"attachment; filename={cours.contenu.name}"
        return response



    @action(detail=True, methods=["POST"], permission_classes=[IsAuthenticated])
    def save_course(self, request, pk=None):
        user = self.get_object()  
        course_id = request.data.get('courseId')  

        if not course_id:
            return Response({"error": "Course ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        course = get_object_or_404(Cours, id=course_id)  
        if course in user.cours_achetes.all():
            return Response({"error": "Course already saved."}, status=status.HTTP_400_BAD_REQUEST)

        user.cours_achetes.add(course)  
        user.save() 
        
        return Response({"message": "Course saved successfully."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["DELETE"])
    def supprimer_tout(self, request):
        Cours.objects.all().delete()
        return Response({"message": "Tous les cours ont été supprimés avec succès."}, status=status.HTTP_200_OK)
   




class UserViewSet(viewsets.ModelViewSet):
   
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["POST"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request=request, username=username, password=password)
        if user:
            if user.is_active:
                token, created = Token.objects.get_or_create(user=user)
                user_data = UserSerializer(user).data

                return Response({"token": token.key, "user": user_data})
            else:
                return Response(
                    {"error": "User account is deactivated."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["POST"])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data["password"])
            user.is_active = True
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=["DELETE"])
    def supprimer_tous(self, request):
        User.objects.all().delete()
        return Response({"message": "Tous les utilisateurs ont été supprimés avec succès."}, status=status.HTTP_200_OK)
    

class CommentaireViewSet(viewsets.ModelViewSet):
    queryset = Commentaires.objects.all()
    serializer_class = CommentaireSerializer
