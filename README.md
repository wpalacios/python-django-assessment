# Movies Application

## Introduction

This application uses Python 3 and Django 1.10. It contains a `Movies` module for managing movie entities.

## Problem statement

### Task #1

Implement the Django movies application. Your tasks is to create the different Django views and models to cover the acceptance criteria in the assessment context:

- List all the movies sorted by date and rating (descending)
- Movie’s details views
- Create new movie
- Delete movies
- Edit movies Create new rating. You must calculate the movie’s overall rating based on every user feedback.

### Tasks #2

We do like testing our code, don’t you??

Unit tests has been implemented for you to verify top-notch code has been written.

Your task is to ensure that all unit tests pass (without editing any of them) by implementing four class-based views (CBV) and mixins.

1. Implement `MovieDetailView`. It should load movie details for a given `id` parameter. If the requested movie doesn't exist, user should be redirected to `/movies/` default route (`MovieListView`: `movies:index`).

2. Implement `MovieCreateView`. It should populate a form field with movie details. After successful submission, user should be redirected to the page of the created movie (`MovieDetailView`: `movie:detail`). Please do not forget to add a validator to check the `id`. The `id` can only be a number, that is it may only contain digits. Validation can be done in the `Movie` model. Additionally, please add the following messages:

   - `The movie has been successfully created!` - when a movie is added.
   - `The creation has failed.` - when the process of adding a movie failed.

3. Implement `MovieUpdateView`. It should populate form fields with movie details for the passed `id` parameter. If the movie with a given `id` doesn't exist, user should be redirected to `/movies/` default route (`MovieListView`: `movies:index`). After successful submission, user should be redirected to the page showing the details of the edited movie (`MovieDetailView`: `movies:detail`). Additionally, please add the following messages:

   - `The movie has been successfully updated!` - when a movie is updated.
   - `The update has failed.` - when the process of updating a movie failed.

4. Implement `MovieDeleteView`. It should delete a movie with a given `id` parameter. If the movie with a given `id` doesn't exist, user should be redirected to `/movies/` default route (`MovieListView`: `movies:index`). Once the movie is deleted, user should be redirected to a list of movies (`MovieListView`: `movies:index`). Additionally, please add the following messages:
   - `The movie has been successfully deleted!` - when a movie is deleted.
   - `The deletion has failed.` - when the process of deleting a movie failed.

## Hints

Please **do not** modify unit tests.

## Setup

To execute the unit tests, use:

```
pip install -q -e . && python setup.py nosetests
```

To run migrations, use:

```
python manage.py makemigrations movies
```

```
python manage.py migrate
```

To load movies fixtures, use:

```
python manage.py loaddata movie
```

To run the project, use:

```
python manage.py runserver
```
