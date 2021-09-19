from django.shortcuts import render
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from .models import Post
from .serializers import PostSerializer

# Create your views here.


class Posts(generics.ListAPIView):
    pagination_class = LimitOffsetPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q' or None)
        if q is not None and q != '':
            queryset = queryset.filter(title__icontains=q)
        return queryset
    