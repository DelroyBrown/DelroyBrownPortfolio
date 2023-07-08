from django.shortcuts import render
from .models import Post, Experience, Skills, Certificates


def home(request):
    context = {
        "posts": Post.objects.all().order_by("-date"),
        "experiences": Experience.objects.all(),
        "skills": Skills.objects.all(),
        "certificates": Certificates.objects.all(),
    }
    return render(request, "index.html", context)


def post_detail(request, id):
    post = Post.objects.get(id=id)
    return render(request, "blog-single-1.html", {"post": post})
