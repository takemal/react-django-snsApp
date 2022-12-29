from rest_framework import serializers
from core.models import Message, FriendRequest, User
from django.db.models import Q


class FriendsFilter(serializers.PrimaryKeyRelatedField):

    def get_queryset(self):
        #DRFからuser情報を取り出す
        user = self.context['request'].user
        #承認済みで自分をフォロワーしている組み合わせfriendsに格納
        friends = FriendRequest.objects.filter(Q(toUser=user) & Q(approved=True))
        
        #friendsの中でフォローしている人の各idを配列に入れる(自分をフォローしてる人)
        list_friend = []
        for friend in friends:
            list_friend.append(friend.fromUser.id)

        queryset = User.objects.filter(id__in=list_friend)
        return queryset

class MessageSerializer(serializers.ModelSerializer):

    receiveUser = FriendsFilter()

    class Meta:
        model = Message
        fields = ('id', 'sendUser', 'receiveUser', 'text')
        extra_kwargs = {'sendUser': {'read_only': True}}