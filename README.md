# Messenger

## Krótki opis

Aplikacja jest komunikatorem z Frontendem napisanym w języku React, backendem w języku Python.
Umożliwia wymianę wiadomości w czasie rzeczywistym. React zapewnia dynamiczną interakcję z interfejsem użytkownika, 
natomiast Python obsługuje serwer, zarządza danymi i zapewnia komunikację między użytkownikami. 
Główne funkcjonalności aplikacji to:
- rejestracja użytkownika
- logowanie za pomocą basic auth oraz konta Facebook
- tworzenie czatów grupowych
- przegląd dostępnych czatów
- wysyłanie/odbieranie wiadomości z czatów
- informowanie uczestników czatu o wyświetleniu wiadomości
- panel administratora zarządzający użytkownikami i administratorami

## Instrukcja użytkownika
### Logowanie/Rejestracja użytkownika
1. Wejdź na stronę domową aplikacji (http://localhost:3000)
2. Zostaniesz przekierowany na stronę logowania tj. (http://localhost:3000/login) (jeśli masz już konto, pomiń kroki 3,4,5)
![image](https://user-images.githubusercontent.com/34356490/218802790-12a46ac2-ca1d-4629-bb76-d3a8549d6ea7.png)
3. W nagłówku strony kliknij w przycisk 'Register', aby przejść do strony rejestrowania nowego użytkownika
![image](https://user-images.githubusercontent.com/34356490/218802961-a3731ebb-638a-4836-ae83-fe02bc6e5d61.png)
4. Zarejestruj użytkownika wpisując wybraną nazwę użytkownika oraz hasło
5. Jeśli nazwa jest dostępna, a hasło posiada ponad 5 znaków, pomyślną rejestrację zakończy wyświetlony alert.
![image](https://user-images.githubusercontent.com/34356490/218803251-91d9b10a-bc38-4f2f-9606-43a82522c6f9.png)
6. Na stronie http://localhost:3000/login wprowadź nazwę i hasło użytkownika lub zaloguj się za pomocą konta facebook wykorzystując przycisk 'Login with Facebook'

### Tworzenie czatu
1. Domyślna strona zalogowanego użytkownika to http://localhost:3000/chat 
2. Na powyższej stronie znajduję sie lista dostępnych czatów oraz przycisk tworzący czat grupowy
![image](https://user-images.githubusercontent.com/34356490/218804093-2499bff1-afe6-435b-b68c-5c040795f3b5.png)
3. Aby rozpocząć proces tworzenia czatu, wciśnij wspomniany przycisk 
4. Wprowadź nazwę czatu oraz dodaj do niego wybranych użytkowników
![image](https://user-images.githubusercontent.com/34356490/218804505-942050d2-7c5d-433b-be80-7a63fe32b0ff.png)
5. Zatwierdź operację przyciskiem 'Create'
6. W lewym dolnym rogu pojawi się nowo stworzony czat wraz z datą stworzenia go
![image](https://user-images.githubusercontent.com/34356490/218804633-a4ba6e3c-5e30-49ba-a355-be118b672b9e.png)

### Obsługa czatu
1. Z listy dostępnych czatów (http://localhost:3000/chat) wybierz wybrany czat klikając w niego
2. Nagłówek czatu wyświetla jego nazwę, w stopce widoczni są jego uczestnicy
![image](https://user-images.githubusercontent.com/34356490/218804989-4f471d73-2267-4b9c-9605-edf3366ffa50.png)
3. Aby wysłać wiadomość należy wprowadzić ją w polu z napisem 'Wprowadź swoją wiadomość'
4. Wysłanie wiadomości zatwierdza się przyciskiem 'enter' lub ikoną samolotu
5. Wysłana wiadomość w nagłówku zawiera informację o wysyłającym ją, datę wysłania oraz status sent/read by: x

![image](https://user-images.githubusercontent.com/34356490/218805311-c22e1c94-b371-4857-bc64-79503dd31b35.png)

6. Odczytana wiadomość wygląda następująco

![image](https://user-images.githubusercontent.com/34356490/218805512-f65a8ceb-1a24-458d-904c-888432df0d78.png)

### Panel administratora
1. Użytkownik posiadający uprawnienia administratora będzie widział dodatkową zakładkę w nagłówku głównym aplikacji
![image](https://user-images.githubusercontent.com/34356490/218805868-067bf9de-067c-464b-b8c8-54cad5c8e9bd.png)
2. Wejście w nią powoduje wyświetlenie specjalnego widoku zarządzania użytkownikami
![image](https://user-images.githubusercontent.com/34356490/218805935-79f21712-c642-4554-a5f1-e6abe0f7bf3b.png)
3. Użytkownicy posiadający ciemniejszą ikonę agenta posiadają uprawnienia administratora
4. Uprawnienia administratora mogą zostać odebrane przez innego użytkownika, który je posiada
5. Uprawnienia administratora mogą zostać nadane przez innego użytkownika, który je posiada
6. Administrator może usunąć konto wybranego użytkownika

### Zakładka Info
1. Zakładka info wyświetla dostępne informacje o użytkowniku w formie tabelki

![image](https://user-images.githubusercontent.com/34356490/218805667-7830049e-a229-413a-ab43-461b00f6b650.png)

###### *Instrukcje developerskie można znaleźć w danym podfolderze (backend/frontend)
