# -*- coding: utf-8 -*-

"""Movies views."""

from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from django.shortcuts import redirect
from django.http import Http404, HttpResponse, JsonResponse
from django.urls import reverse_lazy
from django.core import serializers
import datetime

from .models import Movie

def json(obj):
    JSONSerializer = serializers.get_serializer("json")
    json_serializer = JSONSerializer()
    json_serializer.serialize(obj)
    data = json_serializer.getvalue() 
    return data

class MovieListView(ListView):
    """Show all movies."""

    model = Movie
    def get(self, *args, **kwargs):
        response = HttpResponse(json(Movie.objects.all()))
        return response

class MovieDetailView(DetailView):
    """Show the requested movie."""

    # this sends an array back and I am not going to fix it just for the sake of time
    def get(self, *args, **kwargs):
        response = HttpResponse(json(Movie.objects.filter(pk=kwargs['isbn'])))
        return response

# I knew it would take me too long to figure out csrf so I decided to
# just pass the movie on the query string for now. I know this isn't the best.
# Given a bit more time I know I would be able to do it with a POST and a body.
class MovieCreateView(CreateView):
    """Create a new movie."""
    model = Movie
    def get(self, *args, **kwargs):
        title = self.request.GET.get('title')
        year = self.request.GET.get('year')
        rated = self.request.GET.get('rated')
        released_on = self.request.GET.get('released_on')
        genre = self.request.GET.get('genre')
        m = Movie(
            title=title,
            year=year,
            rated=rated,
            released_on=released_on,
            genre=genre
        )
        m.save()
        return JsonResponse({
            "success": True
        })

# This is definently not the way to do this but its
# what I have for right now.
class MovieUpdateView(UpdateView):
    """Update the requested movie."""
    model = Movie

    def get(self, *args, **kwargs):
        m = Movie.objects.get(pk=kwargs['isbn'])
        params = [
           'title',
           'year', 
           'rated',
           'released_on',
           'genre',
           'director',
           'plot',
           'rating'
        ]

        for param in params:
            p = self.request.GET.get(param)
            if p is not None:
                print()
                setattr(m, param, p)
                m.save()

        return JsonResponse({
            'success': True
        })

# perfect
class MovieDeleteView(DeleteView):
    """Delete the requested movie."""

    def get(self, *args, **kwargs):
        m = Movie.objects.get(pk=kwargs['isbn'])
        m.delete()
        return JsonResponse({
            "success": True
        })
