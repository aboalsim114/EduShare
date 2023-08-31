from django.urls import path, include
from rest_framework import routers
from .views import CoursViewSet, UserViewSet, CommentaireViewSet

router = routers.DefaultRouter()
router.register("cours", CoursViewSet, basename="cours")
router.register("user", UserViewSet, basename="user")
router.register("commentaire", CommentaireViewSet, basename="commentaire")
urlpatterns = [
    path("api/", include(router.urls)),
]
