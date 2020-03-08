# -*- coding: utf-8 -*-

"""Movies views."""

from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, View
from django.contrib import messages
from django.shortcuts import redirect
from django.http import Http404, JsonResponse
from django.urls import reverse_lazy
from django.contrib import messages

from .models import Movie, Rating


class MovieListView(ListView):
    """Show all movies."""

    model = Movie


class MovieDetailView(DetailView):
    """Show the requested movie."""
    def get(self, request, *args, **kwargs):
        try:
            self.object = Movie.objects.get(pk=self.kwargs.get('pk'))
            context = self.get_context_data(object=self.object)
            return self.render_to_response(context)
        except Http404:
            return redirect('movies:index')


class MovieCreateView(CreateView):
    """Create a new movie."""
    model = Movie
    fields = ['title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot']

    def form_valid(self, form):
        messages.success(self.request, 'The movie has been successfully created!')
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, 'The creation has failed.')
        return super().form_invalid(form)


class MovieUpdateView(UpdateView):
    """Update the requested movie."""
    model = Movie
    fields = ['title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot']

    def get(self, request, *args, **kwargs):
        try:
            self.object = Movie.objects.get(pk=self.kwargs.get('pk'))
            context = self.get_context_data(object=self.object)
            return self.render_to_response(context)
        except Http404:
            return redirect('movies:index')

    def form_valid(self, form):
        messages.success(self.request, 'The movie has been successfully updated!')
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, 'The update has failed.')
        return super().form_invalid(form)


class MovieDeleteView(DeleteView):
    """Delete the requested movie."""
    model = Movie
    redirect_url ='movies:index'

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        try:
          self.object.delete()
          messages.success(self.request, 'The movie has been successfully deleted!')
        except:
          messages.error(self.request, 'The deletion has failed.')

        return redirect(self.redirect_url)


class MovieRatingView(View):
    def post(self, request, pk):
      try:
        m = Movie.objects.get(pk=pk)
        rating = Rating(movie=m, rating=request.POST['rating'])
        rating.save()
        return JsonResponse(True, safe=False)
      except:
        return JsonResponse(False, safe=False)
