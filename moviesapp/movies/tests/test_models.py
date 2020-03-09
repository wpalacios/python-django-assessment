from django.test import TestCase

from moviesapp.movies.models import Movie


class TestMovie(TestCase):

    def setUp(self):
        self.movie = Movie.objects.get(id=1)

    def test_get_absolute_url(self):
        self.assertEqual(
            self.movie.get_absolute_url(),
            '/movies/1/'
        )

    def test_title(self):
        self.assertEqual(self.movie.title, 'Guardians of the Galaxy Vol. 2')
