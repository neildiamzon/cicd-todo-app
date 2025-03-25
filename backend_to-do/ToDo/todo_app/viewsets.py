from rest_framework import viewsets
from .models import TodoCard
from .serializers import TodoCardSerializer

class TodoCardViewSet(viewsets.ModelViewSet):
    queryset = TodoCard.objects.all()
    serializer_class = TodoCardSerializer
