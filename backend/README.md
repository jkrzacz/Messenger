# Messenger - Backend

## Opis aplikacji

Ta część aplikacji odpowiada za backend, napisany w języku Python. Obsługuje pełną funkcjonalność komunikatora wiadomości.

## Wymagania

- Python 3.11.1 https://www.python.org/downloads/

## Wykorzystane biblioteki

- fastapi 0.89.1
- python-jose 3.3.0
- passlib 1.7.4
- pydantic 1.10.4
- uvicorn 0.20.0
- bcrypt 4.0.1
- python-multipart 0.0.5
- requests 2.28.2

## Instrukcja uruchomienia [DEV]

1. Należy zainstalować Python w wersji 3.11.1
2. W kontekście `/backend` wprowadzić komendę instalującą zależności:

```bash
pip install -r requirements.txt
```

3. W kontekście `/backend` wprowadzić komendę uruchamiającą serwer:

```bash
python main.py
```
