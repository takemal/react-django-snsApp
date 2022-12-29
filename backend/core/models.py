from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

# 画像の保管場所：images/ニックネーム.拡張子に設定
def upload_path(instance, filename):
		#拡張子を抜き取る
    ext = filename.split('.')[-1]
    return '/'.join(['images', str(instance.user.id)+str(instance.nickName)+str(".")+str(ext)])

# 本来はusernameとpassword認証だが、emailとpasswordの場合は書き換える必要あり
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
				#emailがない場合は、必須エラー表示
        if not email:
            raise ValueError('email is must')
				#emailを正規化(小文字化)
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

		#カスタマイズの際はsuperuserもオーバーライド
    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using= self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

class Profile(models.Model):
    nickName = models.CharField(max_length=20)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='profile',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True, upload_to=upload_path)

		#特殊メソッド
    def __str__(self):
        return self.nickName

class FriendRequest(models.Model):
    fromUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='from_friendRequest',
        on_delete=models.CASCADE
    )
    toUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='to_friendRequest',
        on_delete=models.CASCADE
    )
    approved = models.BooleanField(default=False)

    class Meta:
        unique_together = (('fromUser', 'toUser'),)

    def __str__(self):
        return str(self.fromUser) + '----->' + str(self.toUser)

class Message(models.Model):

    text = models.CharField(max_length=140)
    sendUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='send_message',
        on_delete=models.CASCADE
    )
    receiveUser = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='receive_message',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.toUser)