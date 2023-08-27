from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="posts/")
    # blog_body = models.TextField(max_length=5000, blank=False, null=False, default='')
    blog_body = RichTextField(max_length=5000, blank=False, null=False, default='')
    blog_list_description = models.TextField(
        max_length=1000, blank=False, null=False, default=""
    )
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
        return f"{self.job_title} at {self.company}"


class Skills(models.Model):
    skill = models.CharField(max_length=50, blank=True, null=True, default="")
    skill_percentage = models.IntegerField()

    class Meta:
        verbose_name_plural = 'Skills'

    def __str__(self):
        return f"{self.skill} {self.skill_percentage}%"


class Certificates(models.Model):
    certificate_title = models.CharField(
        max_length=250, blank=True, null=True, default=""
    )
    certificate_aquired_through = models.CharField(
        max_length=100, blank=True, null=True, default=""
    )
    certificate_description = models.TextField(
        max_length=1000, blank=True, null=True, default=""
    )
    certificate_completion_date = models.CharField(
        max_length=50, blank=True, null=True, default=""
    )

    class Meta:
        verbose_name_plural = 'Certificates'

    def __str__(self):
        return f"{self.certificate_title} from {self.certificate_aquired_through}"

class NavDataTarget(models.Model):
    nav_data_target = models.CharField(
        max_length=50, blank=True, null=True, default=""
    )

    def __str__(self):
        return self.nav_data_target


class MyWork(models.Model):
    data_target = models.ForeignKey(NavDataTarget, on_delete=models.CASCADE, blank=False, null=False)
    image = models.ImageField(blank=True, null=True)
    project_title = models.CharField(max_length=50, blank=True, null=True, default="")
    project_link = models.CharField(max_length=100, blank=True, null=True, default="")
    project_source_code_link = models.CharField(
        max_length=100, blank=True, null=True, default=""
    )

    class Meta:
        verbose_name_plural = 'My Work'

    def __str__(self):
        return f"{self.project_title}"


class AboutMe(models.Model):
    about_me_blurb = RichTextField(max_length=5000, blank=True, null=True, default='')

    class Meta:
        verbose_name_plural = 'About Me'


class Message(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False, default="")
    email = models.EmailField(max_length=200, blank=True, null=True, default="")
    subject = models.CharField(max_length=200, blank=False, null=False, default="")
    content = models.TextField(max_length=5000, blank=True, null=True, default="")

    def __str__(self):
        return f"{self.name} is asking about {self.subject}"
