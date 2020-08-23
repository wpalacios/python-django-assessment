# -*- coding: utf-8 -*-

"""Movies views."""

from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib import messages
from django.shortcuts import redirect, get_object_or_404
from django.http import Http404, HttpResponseRedirect
from django.urls import reverse
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Avg, Count
from django.db.models.functions import Coalesce

from .models import Movie, Rating
from .forms import MovieModelForm

class MovieListView(ListView):
    """Show all movies."""
    queryset = Movie.objects.annotate(num_votes=Count('rating'), avg_rating=Coalesce(Avg('rating__rating_number'), 0))
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

def vote(request, movie_id):
    rating = Rating(movie_id=movie_id, rating_number=request.POST['rating'])
    rating.save()
    messages.success(request, 'Your vote was recorded successfully')
    return HttpResponseRedirect(reverse('movies:index'))