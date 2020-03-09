# -*- coding: utf-8 -*-
from django.urls import reverse
from django.core.validators import RegexValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models import Avg


class Movie(models.Model):
    title = models.CharField(_('Movie\'s title'), max_length=255, unique=True)
    year = models.PositiveIntegerField(default=2019)
    # Example: PG-13
    rated = models.CharField(max_length=64)
    released_on = models.DateField(_('Release Date'))
    genre = models.CharField(max_length=255)
    director = models.CharField(max_length=255)
    plot = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)
    # Todo: add Rating models

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('movies:detail', kwargs={'id': self.id})

    def rating(self):
        ratings = self.rating_set.all()
        average = ratings.aggregate(Avg('rating'))
        return round(average['rating__avg'], 2) if ratings.count() > 0 else 0


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
