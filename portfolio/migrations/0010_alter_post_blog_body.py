# Generated by Django 4.2.1 on 2023-07-22 19:21

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0009_post_blog_list_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='blog_body',
            field=tinymce.models.HTMLField(),
        ),
    ]
