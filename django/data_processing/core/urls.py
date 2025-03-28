from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import FilesViewSet

router = routers.SimpleRouter()
router.register(r'files', FilesViewSet, basename='files')

urlpatterns = [
    path("api/", include(router.urls)),
]