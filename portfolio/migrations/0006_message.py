# Generated by Django 4.2.1 on 2023-07-09 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0005_certificates_certificate_completion_date'),
    ]

    operations = [
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
    ]