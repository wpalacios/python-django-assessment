from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):

    # Calculated fields
    num_votes = serializers.IntegerField(read_only=True)
    avg_rating = serializers.FloatField(read_only=True)

    class Meta:
        model = Movie
        fields = (
            'pk',
            'title',
            'year',
            'rated',
            'released_on',
            'genre',
            'director',
            'plot',
            'created_at',
            'updated_at',
            'num_votes',
            'avg_rating'
        )