from rest_framework.views import APIView
from .serializer import ReviewSerializer,CreateBookSerializer,GetBookSerializer,BookSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Book,Review
from User.models import CustomUser
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthor

# Create your views here.
class CreateBookView(APIView):
    serializer_class = CreateBookSerializer

    def post(self,request):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@permission_classes([IsAuthenticated])
class ListBooksView(APIView):
    permission_classes =[IsAuthor]
    serializer_class = GetBookSerializer
    def get(self,request):
        user = request.user
        # user = CustomUser.objects.filter(username=user).first()  
        books = Book.objects.all()
        serializer = self.serializer_class(books,many=True)
        Books = serializer.data
        return Response(Books,status=status.HTTP_200_OK)


class BookByIDView(APIView):
    serializer_class = BookSerializer

    def get(self,request,id):
        try:
            book = Book.objects.filter(id=id).first()
            if book:
                serializer = self.serializer_class(book)
                data = serializer.data
                return Response(data,status=status.HTTP_200_OK)
            else:
                return Response('Book not found', status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response('Book not found',status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
class ReviewView(APIView):
    serializer_class = ReviewSerializer

    def post(self, request):
        book = request.data.get('book')
        user = request.user
        # print(user)

        try:
            book = Book.objects.get(id=book)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        data['user']=user.id
        data['book'] = book.id

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # Manually assign the book and user instances
            serializer.validated_data['user'] = user
            serializer.validated_data['book'] = book
            print(serializer.validated_data)  # Debugging line to print validated data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetReviewView(APIView):
    serializer_class = ReviewSerializer

    def get(self,request,id):
        try:
            review = Review.objects.filter(book_id=id).all() 
            if review:
                serializer = self.serializer_class(review)
                data = serializer.data
                return Response(data,status=status.HTTP_200_OK)
            else:
                return Response('Book not found', status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response('Book not found',status=status.HTTP_404_NOT_FOUND)