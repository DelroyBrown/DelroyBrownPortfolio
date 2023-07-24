# Generated by Django 4.2.1 on 2023-07-24 17:58

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_title', models.CharField(blank=True, default='', max_length=250, null=True)),
                ('certificate_aquired_through', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('certificate_description', models.TextField(blank=True, default='', max_length=1000, null=True)),
                ('certificate_completion_date', models.CharField(blank=True, default='', max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_title', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('company', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('role_description', models.TextField(max_length=1000)),
                ('time_working_for_company', models.CharField(blank=True, default='', max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200)),
                ('email', models.EmailField(blank=True, default='', max_length=200, null=True)),
                ('subject', models.CharField(default='', max_length=200)),
                ('content', models.TextField(blank=True, default='', max_length=5000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MyWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nav_data_target', models.CharField(default='', max_length=50)),
                ('image', models.ImageField(upload_to='')),
                ('project_title', models.CharField(default='', max_length=50)),
                ('project_link', models.CharField(default='', max_length=100)),
                ('project_source_code_link', models.CharField(blank=True, default='', max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('skill_percentage', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='posts/')),
                ('blog_body', ckeditor.fields.RichTextField()),
                ('blockquote', models.TextField()),
                ('blog_list_description', models.TextField(default='', max_length=1000)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
