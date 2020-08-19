# -*- coding: utf-8 -*-

"""Movies views."""

from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib import messages
from django.shortcuts import redirect, get_object_or_404
from django.http import Http404
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin

from .models import Movie
from .forms import MovieModelForm

class MovieListView(ListView):
    """Show all movies."""
    model = Movie
    context_object_name = 'movie_list'

class MovieDetailView(DetailView):
    """Show the requested movie."""
    model = Movie
    context_object_name = 'movie'
    def get(self, request, *args, **kwargs):
        try:
            return super(MovieDetailView, self).get(request, *args, **kwargs)
        except Http404:
            return redirect('/')
    def get_object(self):
        return get_object_or_404(Movie, **self.kwargs)

class MovieCreateView(SuccessMessageMixin, CreateView):
    """Create a new movie."""
    template_name = 'movies/movie_form.html'
    form_class = MovieModelForm
    queryset = Movie.objects.all()
    success_message = "The movie created successfully"

class MovieUpdateView(SuccessMessageMixin, UpdateView):
    """Update the requested movie."""
    template_name = 'movies/movie_form.html'
    form_class = MovieModelForm
    queryset = Movie.objects.all()
    success_message = "The movie updated successfully"
    def get(self, request, *args, **kwargs):
        try:
            return super(MovieUpdateView, self).get(request, *args, **kwargs)
        except Http404:
            return redirect('/movies')
    def get_object(self):
        return get_object_or_404(Movie, **self.kwargs)

class MovieDeleteView(DeleteView):
    """Delete the requested movie."""
    model = Movie
    success_url = '/movies'
    def get(self, request, *args, **kwargs):
        try:
            return super(MovieDeleteView, self).get(request, *args, **kwargs)
        except Http404:
            return redirect('/movies')
    def get_object(self):
        return get_object_or_404(Movie, **self.kwargs)
    def delete(self, request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        messages.success(self.request, 'The movie deleted successfully')
        return response