from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Checkedrules(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    checkedrules=models.CharField(max_length=150)