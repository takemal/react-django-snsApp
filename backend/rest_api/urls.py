from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authen/', obtain_auth_token),
    path('api/user/', include('api.urls')),
    path('api/dm/', include('api_dm.urls')),
]

# urlにmedia用のリンクを設定
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)