# Generated by Django 4.2.1 on 2023-07-08 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_experience'),
    ]

    operations = [
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(blank=True, default='', max_length=50, null=True)),
                ('skill_percentage', models.IntegerField()),
            ],
        ),
    ]