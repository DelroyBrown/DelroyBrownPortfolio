from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path("", views.home, name="home"),
    path('post/<int:id>/', views.post_detail, name='post_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)