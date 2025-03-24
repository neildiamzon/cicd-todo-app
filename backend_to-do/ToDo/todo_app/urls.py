from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoCardViewSet

router = DefaultRouter()
router.register(r'todos', TodoCardViewSet)  # The API will be available at /api/todos/

urlpatterns = [
    path('api/', include(router.urls)),
]
