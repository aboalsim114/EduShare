from .models import Cours, User, Commentaires
from rest_framework import serializers
from . import models


class CoursSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Cours
        fields = "__all__"

    def get_download_url(self, obj):
        return obj.get_download_url()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["download_url"] = self.get_download_url(instance)
        return representation


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = "__all__"


class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaires
        fields = "__all__"
