# -*- coding: utf-8 -*-

"""Movies views."""

from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, View
from django.contrib import messages
from django.shortcuts import redirect
from django.http import Http404, JsonResponse
from django.urls import reverse_lazy
from django.contrib import messages
from django.db.models import Avg
from django.core.exceptions import ObjectDoesNotExist

from .models import Movie, Rating


class MovieListView(ListView):
    """Show all movies."""
    model = Movie

    def get_queryset(self):
        # queryset = Movie.objects.all().order_by('-released_on')
        queryset = Movie.objects.annotate(average=Avg('rating__rating')).order_by('-released_on', '-average')
        return queryset


class MovieDetailView(DetailView):
    """Show the requested movie."""
    def get(self, request, *args, **kwargs):
        try:
            self.object = Movie.objects.get(id=self.kwargs.get('id'))
            context = self.get_context_data(object=self.object)
            return self.render_to_response(context)
        except ObjectDoesNotExist:
            return redirect('movies:index')


class MovieCreateView(CreateView):
    """Create a new movie."""
    model = Movie
    fields = ['title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot']

    def form_valid(self, form):
        messages.success(self.request, 'The movie created successfully')
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, 'The creation has failed')
        return super().form_invalid(form)


class MovieUpdateView(UpdateView):
    """Update the requested movie."""
    model = Movie
    fields = ['title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot']
    pk_url_kwarg = 'id'

    def get(self, request, *args, **kwargs):
        try:
            self.object = Movie.objects.get(id=self.kwargs.get('id'))
            context = self.get_context_data(object=self.object)
            return self.render_to_response(context)
        except ObjectDoesNotExist:
            return redirect('movies:index')

    def form_valid(self, form):
        messages.success(self.request, 'The movie updated successfully')
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, 'The update has failed.')
        return super().form_invalid(form)


class MovieDeleteView(DeleteView):
    """Delete the requested movie."""
    model = Movie
    redirect_url ='movies:index'
    pk_url_kwarg = 'id'

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        try:
          self.object.delete()
          messages.success(self.request, 'The movie deleted successfully')
        except ObjectDoesNotExist:
          messages.error(self.request, 'The deletion has failed.')

        return redirect(self.redirect_url)


class MovieRatingView(View):
    def post(self, request, id):
      try:
        m = Movie.objects.get(id=id)
        rating = Rating(movie=m, rating=request.POST['rating'])
        rating.save()
        return JsonResponse(True, safe=False)
      except:
        return JsonResponse(False, safe=False)
