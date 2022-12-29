from django.urls import path, include
from api.views import CreateUserView, MyProfileListView, ProfileViewSet, FriendRequestViewSet
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register('profile',ProfileViewSet, basename='profile')
router.register('approval', FriendRequestViewSet, basename='approval')

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('myprofile/', MyProfileListView.as_view(), name='myprofile'),
    path('',include(router.urls))
]