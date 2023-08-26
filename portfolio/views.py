import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Experience, Skills, Certificates, Message, MyWork, AboutMe, NavDataTarget


def home(request):
    context = {
        "posts": Post.objects.all().order_by("-date"),
        "experiences": Experience.objects.all(),
        "skills": Skills.objects.all(),
        "certificates": Certificates.objects.all().order_by(
            "-certificate_completion_date"
        ),
        "myworks": MyWork.objects.all(),
        "navDataTargets": NavDataTarget.objects.all(),
        "aboutme": AboutMe.objects.all(),
    }
    return render(request, "index.html", context)


def post_detail(request, id):
    post = Post.objects.get(id=id)
    next_post = Post.objects.filter(id__gt=post.id).order_by("id").first()
    previous_post = Post.objects.filter(id__lt=post.id).order_by("-id").first()
    context = {
        "post": post,
        "next_post": next_post,
        "previous_post": previous_post,
    }
    return render(request, "blog-single-1.html", context)


@csrf_exempt
def send_email(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("userName")
        email = data.get("userEmail")
        subject = data.get("subject")
        content = data.get("content")

        Message.objects.create(name=name, email=email, subject=subject, content=content)

        return JsonResponse({"message": "Message saved successfully."})
    else:
        return JsonResponse({"error": "Invalid request."}, status=400)
