from django.db import models
from datetime import date
from User.models import CustomUser

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=20,unique=True)
    author = models.CharField(max_length=20)
    date = models.DateField(default=date.today) 
    published_date = models.DateField()
    isbn = models.CharField(max_length=20,unique=True)
    summary = models.CharField(max_length=20,unique=True)

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    # book = models.IntegerField()
    # user = models.IntegerField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=255)
    
