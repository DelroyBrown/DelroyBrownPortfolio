from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="posts/")
    text = models.TextField()
    blockquote = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Experience(models.Model):
    job_title = models.CharField(max_length=100, blank=True, null=True, default="")
    company = models.CharField(max_length=100, blank=True, null=True, default="")
    role_description = models.TextField(max_length=1000)
    time_working_for_company = models.CharField(
        max_length=100, blank=True, null=True, default=""
    )

    def __str__(self):
        return self.job_title + " at " + self.company
