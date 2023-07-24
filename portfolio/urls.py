from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import send_email

app_name = "portfolio"

urlpatterns = [
    path("", views.home, name="home"),
    path("send_message/", send_email, name="send_message"),
    path("post/<int:id>/", views.post_detail, name="post_detail"),
    path("portfolio/", views.portfolio, name="portfolio"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
