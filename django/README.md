# Django backend for the project

## Requirements

-   Python 3.8 or higher

## Setup

1. Create a virtual environment

```console
python -m venv venv
```

2. Activate the virtual environment

```console
# Windows
.\venv\Scripts\activate
```

3. Install the requirements from the `requirements.txt` file

```console
pip install -r .\requirements.txt
```

4. Create a Django project named `data_processing`

```console
django-admin startproject data_processing
```

5. Create a Django app named `core`

```console
django-admin startapp core
```

6. Make database migrations

```console
python .\manage.py makemigrations
python .\manage.py migrate
```

7. Run the Django server

```console
python .\manage.py runserver
```
