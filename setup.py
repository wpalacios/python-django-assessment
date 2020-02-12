from setuptools import find_packages, setup

setup(
    name='movies-rating app',
    version='1.0.0',
    author='William Palacios',
    author_email='williamp@nicasource.com',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'wheel==0.29.0',
        'django==1.11.28',
        'nose==1.3.7',
        'django-nose==1.4.4',
        'nosedjango==1.0.13'
    ],
    test_suite='tests',
    tests_require=['nose'],
)
