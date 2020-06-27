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
    # I did the calculation for the rating on the front end. 
    # For a Valuation Software those calculations should probably be done on the back end.
    model = Movie
    def get(self, *args, **kwargs):
        response = HttpResponse(json(Movie.objects.all()))
        return response

class MovieDetailView(DetailView):
    """Show the requested movie."""

    # this sends an array back I need to fix it.
    def get(self, *args, **kwargs):
        response = HttpResponse(json(Movie.objects.filter(pk=kwargs['isbn'])))
        return response

# I knew it would take me too long to figure out csrf so I decided to
# just pass the movie on the query string for now. I know this isn't the best.
# Given a bit more time I know I would be able to do it with a POST and a body.
class MovieCreateView(CreateView):
    """Create a new movie."""
    model = Movie
    # should be POST
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
    # using GET here and using query params is not how this needs to be done
    # for the tests to pass and its not how it should be done in production.
    # given a bit more time I would make this work with a post.
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
           'created_at',
           'updated_at'
        ]

        # I realize now this is pretty slow dispite using less code.
        # Another solution might be better... And I need to use a post.
        for param in params:
            p = self.request.GET.get(param)
            if p is not None:
                setattr(m, param, p)
                m.save()
        
        rating = self.request.GET.get('rating')
        if rating is not None:
            m.total_rating += int(rating)
            m.num_of_ratings += 1
            m.save()

        
        
        
        # this needs to send meaningful data back
        return JsonResponse({
            'success': True
        })

# perfect
class MovieDeleteView(DeleteView):
    """Delete the requested movie."""

    def get(self, *args, **kwargs):
        m = Movie.objects.get(pk=kwargs['isbn'])
        m.delete()

        # this needs to send meaningful data back
        return JsonResponse({
            "success": True
        })
