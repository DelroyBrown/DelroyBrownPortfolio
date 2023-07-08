from django.shortcuts import render
from .models import Post, Experience


def home(request):
    posts = Post.objects.all().order_by("-date")
    experiences = Experience.objects.all()
    return render(request, "index.html", {"posts": posts, "experiences" : experiences})


def post_detail(request, id):
    post = Post.objects.get(id=id)
    return render(request, "blog-single-1.html", {"post": post})

