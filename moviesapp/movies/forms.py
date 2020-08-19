from django import forms
from .models import Movie

class MovieModelForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ['title', 'year', 'rated', 'released_on', 'genre', 'director', 'plot']
