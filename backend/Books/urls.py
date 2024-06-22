from django.urls import path
from .views import (
    CreateBookView,
    ListBooksView,
    BookByIDView,
    ReviewView,
    GetReviewView,
    )

urlpatterns =[
    path('create',CreateBookView.as_view(),name='new_book'),
    path('list',ListBooksView.as_view(),name='list_book'),
    path('<int:id>',BookByIDView.as_view(),name='book'),
    path('review',ReviewView.as_view(),name='review'),
    path('get-review',GetReviewView.as_view(),name='get-review'),
]