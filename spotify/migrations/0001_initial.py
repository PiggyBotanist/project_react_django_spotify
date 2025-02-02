# Generated by Django 5.0 on 2025-01-25 19:04

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="spotifyToken",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("user", models.CharField(max_length=50, unique=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("refresh_token", models.CharField(max_length=150)),
                ("access_token", models.CharField(max_length=150)),
                ("expires_in", models.DateTimeField()),
                ("token_field", models.CharField(max_length=50)),
            ],
        ),
    ]
