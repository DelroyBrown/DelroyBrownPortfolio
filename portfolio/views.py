import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (Post,
                     Experience,
                     Skills,
                     Certificates,
                     Message
                     )


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


@csrf_exempt
def send_email(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get('userName')
        email = data.get('userEmail')
        subject = data.get('subject')
        content = data.get('content')

        Message.objects.create(name=name, email=email, subject=subject, content=content)

        return JsonResponse({"message": "Message saved successfully."})
    else:
        return JsonResponse({"error": "Invalid request."}, status=400)
