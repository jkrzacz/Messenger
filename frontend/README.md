# Messenger - Frontend

## Opis aplikacji

Ta część aplikacji odpowiada za frontend, który został napisany w języku React. 
Umożliwia komunikowanie się z backendem w celu uzyskania pełnej funkcjonalności komunikatora wiadomości.

## Wymagania

- Node w wersji 18 (LTS) https://nodejs.org/en/

## Wykorzystane biblioteki OSS

### Główne funkcjonalności aplikacji

- @greatsumini/react-facebook-login (logowanie profilem facebooka)
- react-redux (przechowywanie kontekstu użytkownika)
- @reduxjs/toolkit (przechowywanie kontekstu użytkownika)
- axios (klient API)

### Widok czatu

- @chatscope/chat-ui-kit-react

### Panel administratora

- semantic-ui-react
- semantic-ui-css

## Instrukcja uruchomienia [DEV]

1. Należy zainstalować NODE w wersji 18+
2. W kontekście `/frontend` wprowadzić komendę instalującą zależności:

```bash
npm install
```

3. W kontekście `/frontend` wprowadzić komendę uruchamiającą serwer:

```bash
npm start dev
```
