from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, viewsets
from .models import TodoCard
from .serializers import TodoCardSerializer
from django.utils.timezone import now

class TodoCardViewSet(viewsets.ModelViewSet):
    queryset = TodoCard.objects.all()
    serializer_class = TodoCardSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]  # Require authentication

    def get_queryset(self):
        return TodoCard.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        # Automatically assign the current logged-in user to the TodoCard
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["delete"])
    def batch_delete(self, request):
        """W
        Custom action to delete multiple TodoCard items by their IDs.
        """
        ids = request.data.get("ids", [])  # Expecting a list of IDs from the request body

        if not ids:
            return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        deleted_count, _ = TodoCard.objects.filter(id__in=ids).delete()

        return Response({"message": f"Deleted {deleted_count} items"}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["patch"])
    def batch_update_status(self, request):
        """
        Custom action to update the status of multiple TodoCard items.
        """
        ids = request.data.get("ids", [])  # Expecting a list of IDs
        new_status = request.data.get("status")  # Expecting "in_progress" or "complete"

        if not ids:
            return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)

        if new_status not in ["in_progress", "complete"]:
            return Response({"error": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)

        updated_count = TodoCard.objects.filter(id__in=ids).update(
            status=new_status,
            updated_at=now()
        )

        return Response({"message": f"Updated {updated_count} items to '{new_status}'."}, status=status.HTTP_200_OK)