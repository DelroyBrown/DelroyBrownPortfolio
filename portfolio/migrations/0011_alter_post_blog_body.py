# Generated by Django 4.2.1 on 2023-07-22 19:26

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0010_alter_post_blog_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='blog_body',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
