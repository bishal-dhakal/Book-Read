from rest_framework import serializers
from .models import Book, Review



class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields =  "__all__"
        # fields =  ['book_id', 'user_id', 'rating', 'comment', 'created_by']

class CreateBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'published_date', 'isbn', 'summary']
        # fields = "__all__"

class GetBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        # fields = ['title', 'author', 'published_date', 'isbn', 'summary']
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(source='review_set',many=True)
    class Meta:
        model = Book
        fields = ['id','title', 'author', 'published_date', 'isbn', 'summary', 'reviews']
        # fields = "__all__"
 
