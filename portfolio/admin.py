from django.contrib import admin
from .models import (Post,
                     Experience,
                     Skills,
                     Certificates,
                     Message
                     )

admin.site.register(Post)
admin.site.register(Experience)
admin.site.register(Skills)
admin.site.register(Certificates)
admin.site.register(Message)