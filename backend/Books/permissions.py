from rest_framework.permissions import BasePermission

class IsAuthor(BasePermission):
    """
    Allows access only to users in the "Author" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='Author').exists()
