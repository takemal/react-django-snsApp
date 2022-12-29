from rest_framework import permissions

class ProfilePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
				#SAFE_METHODS：作成、観覧(GET)のみ許可
        if request.method in permissions.SAFE_METHODS:
            return True
				#DELETEやCREATEの場合は、アクセスしたユーザのidがログインユーザのidと同じ場合のみ許可
        return obj.user.id == request.user.id