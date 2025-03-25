from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RegisterView, LoginView, LogoutView
from .viewsets import TodoCardViewSet

router = DefaultRouter()
router.register(r'todo', TodoCardViewSet)  # The API will be available at /api/todo/

urlpatterns = [path('api/', include(router.urls)), path('register/', RegisterView.as_view(), name='register'),
               path('login/', LoginView.as_view(), name='login'), path('logout/', LogoutView.as_view(), name='logout')]

