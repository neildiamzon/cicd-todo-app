from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import TodoCard
from django.db import connections

class TodoCardViewSetTestCase(APITestCase):
    def setUp(self):
        """Setup test data"""
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Create a sample TodoCard
        self.todo = TodoCard.objects.create(
            title='Test Todo',
            description='Test Description',
            status='pending',
            user=self.user
        )
    @classmethod
    def tearDownClass(self):
        """Close database connections after each test"""
        connections.close_all()  # Close all database connections

    def test_create_todo(self):
        """Test creating a new TodoCard"""
        data = {
            "title": "New Task",
            "description": "A new task description",
            "status": "pending",
            "priority": "medium",
            "due_date": "2025-04-01T12:00:00Z",
            "user": self.user.id
        }
        response = self.client.post('/api/todo/', data)
        print("Response Data:", response.data)  # Debug output
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TodoCard.objects.count(), 2)

    def test_get_todo_list(self):
        """Test retrieving the TodoCard list"""
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_todo(self):
        """Test updating an existing TodoCard"""
        data = {"status": "in_progress"}
        response = self.client.patch(f'/api/todo/{self.todo.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.status, "in_progress")

    def test_delete_todo(self):
        """Test deleting a TodoCard"""
        response = self.client.delete(f'/api/todo/{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TodoCard.objects.count(), 0)

    def test_batch_delete(self):
        """Test batch delete of TodoCards"""
        data = {"ids": [self.todo.id]}
        response = self.client.delete('/api/todo/batch_delete/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TodoCard.objects.count(), 0)

    def test_batch_update_status(self):
        """Test batch updating TodoCard status"""
        data = {"ids": [self.todo.id], "status": "complete"}
        response = self.client.patch('/api/todo/batch_update_status/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.status, "complete")

    def test_authentication_required(self):
        """Test that authentication is required"""
        self.client.credentials()  # Remove authentication
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
