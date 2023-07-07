from django.shortcuts import render
from .models import Post


def home(request):
    posts = Post.objects.all().order_by("-date")
    return render(request, "index.html", {"posts": posts})


def post_detail(request, id):
    post = Post.objects.get(id=id)
    return render(request, "blog-single-1.html", {"post": post})

