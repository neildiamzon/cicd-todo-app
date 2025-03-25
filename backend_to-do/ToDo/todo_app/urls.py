from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TodoCardViewSet

router = DefaultRouter()
router.register(r'todo', TodoCardViewSet)  # The API will be available at /api/todo/

urlpatterns = [
    path('api/', include(router.urls)),
]
