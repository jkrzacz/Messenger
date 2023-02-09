from typing import Optional
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.responses import RedirectResponse
from Auth.schemas import UserAuth, TokenSchema
from Auth.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)
from Auth.deps import get_current_user
from Services.UserService import UserService
from Services.ChatService import ChatService
from Services.MessageService import MessageService
from Services.ChatReaderService import ChatReaderService
from Services.MessageReaderService import MessageReaderService
from Services.FacebookService import FacebookService

from Models.User import User, SystemUser
from Models.Chat import CreateChat, Chat
from Models.ChatReader import ChatReader
from Models.Message import CreateMessage, Message
from Models.MessageReader import CreateMessageReader, MessageReader
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/', response_class=RedirectResponse, include_in_schema=False)
async def docs():
    return RedirectResponse(url='/docs')


@app.post('/signup', summary="Create new user", response_model=User)
async def create_user(data: UserAuth):
    userService = UserService()
    user = userService.get_user_for_name(data.name)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this name already exist"
        )

    is_admin = False
    password = get_hashed_password(data.password)
    user = userService.add_user(is_admin,data.name,password, None)
    return user


@app.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(username: str, fb_token: Optional[str] = None, password: Optional[str] = None):
    if not (fb_token is None):
        user = FacebookService().get_user_for_token(username, fb_token)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or fb_token"
            )

    if fb_token is None:
        user = UserService().get_user_for_name(username)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or password"
            )

        hashed_pass = user.password
        if not verify_password(password, hashed_pass):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect name or password"
            )

    return TokenSchema(access_token=create_access_token(user.name), refresh_token=create_refresh_token(user.name))


@app.get('/me', summary='Get details of currently logged in user', response_model=User)
async def get_me(user: SystemUser = Depends(get_current_user)):
   return user


@app.get('/users', summary='Get users')
async def get_users(user: SystemUser = Depends(get_current_user)):
    userService = UserService()
    users = userService.get_users()
    return users


@app.get('/user', summary='Get user')
async def get_users(user_id: int, user: SystemUser = Depends(get_current_user)):
    return UserService().get_user_for_id(user_id)


@app.post('/user/admin', summary="change admin")
async def change_admin(user_id: int, is_admin: bool, user: SystemUser = Depends(get_current_user)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are not admin"
        )

    return UserService().change_admin(user_id,is_admin)


@app.delete('/user', summary="Delete user")
async def delete_user(user_id: int, user: SystemUser = Depends(get_current_user)):
    if user.is_admin == False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You are not admin"
        )

    if user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You can not delete yourself"
        )

    return UserService().delete_user(user_id)


@app.post('/chat', summary="Create new chat", response_model=Chat)
async def create_chat(data: CreateChat, user: SystemUser = Depends(get_current_user)):
    chat = ChatService().add_chat(user.id,data.name)
    ChatReaderService().add_chat_reader(chat.id,user.id)
    return chat


@app.get('/chats', summary='Get chats from logged user')
async def get_chats(user: SystemUser = Depends(get_current_user)):
    chatService = ChatService()
    if user.is_admin == True:
        return chatService.get_all_chats()

    chat_ids = ChatReaderService().get_chats_for_user(user.id)
    chats = []
    for chat_id in chat_ids:
        chat = chatService.get_chat(chat_id)
        chats.append(chat)

    return chats


@app.post('/chat/reader', summary="add chat reader", response_model=ChatReader)
async def create_chat(data: ChatReader, user: SystemUser = Depends(get_current_user)):
    chat = ChatService().get_chat(data.chat_id)
    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chat not found"
        )

    userToAdd = UserService().get_user_for_id(data.user_id)
    if userToAdd is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )

    service = ChatReaderService()
    user_ids_in_chat = service.get_users_for_chat(data.chat_id)
    if not user.id in user_ids_in_chat:
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

    return service.add_chat_reader(data.chat_id,data.user_id)


@app.get('/chat/readers', summary='Get readers for chat')
async def get_chat_readers(chat_id: int, user: SystemUser = Depends(get_current_user)):
    user_ids_in_chat = ChatReaderService().get_users_for_chat(chat_id)
    if not user.id in user_ids_in_chat:
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

    return user_ids_in_chat


@app.get('/chat/messages', summary='Get messages for chat')
async def get_chat_readers(chat_id: int,  take: int,  skip: int, user: SystemUser = Depends(get_current_user)):
    user_ids_in_chat = ChatReaderService().get_users_for_chat(chat_id)
    if not user.id in user_ids_in_chat:
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

    return MessageService().get_messages_for_chat(chat_id,  take,  skip)


@app.post('/chat/message', summary="add chat message", response_model=Message)
async def create_chat_message(data: CreateMessage, user: SystemUser = Depends(get_current_user)):
    chat = ChatService().get_chat(data.chat_id)
    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chat not found"
        )

    addUser = UserService().get_user_for_id(data.user_id)
    if addUser is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )

    service = ChatReaderService()
    user_ids_in_chat = ChatReaderService().get_users_for_chat(data.chat_id)
    if user.is_admin == False:
        if not user.id in user_ids_in_chat:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

        if user.id != data.user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="you cant create message for other users"
            )

    return MessageService().add_message(data.chat_id, data.user_id, data.message)


@app.post('/chat/message/reader', summary="add chat message reader", response_model=MessageReader)
async def create_message_reader(data: CreateMessageReader, user: SystemUser = Depends(get_current_user)):
    message = MessageService().get_message(data.message_id)
    if message is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message not found"
        )

    userToAdd = UserService().get_user_for_id(data.user_id)
    if userToAdd is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )

    if user.is_admin == False:
        user_ids_in_chat = ChatReaderService().get_users_for_chat(message.chat_id)
        if not user.id in user_ids_in_chat:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

        if user.id != data.user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="you cant read message for other users"
            )

    return MessageReaderService().add_message_reader(data.message_id, data.user_id)


@app.get('/chat/message/readers', summary='Get readers for message')
async def get_chat_readers(message_id: int, user: SystemUser = Depends(get_current_user)):
    message = MessageService().get_message(message_id)
    if message is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message not found"
        )

    user_ids_in_chat = ChatReaderService().get_users_for_chat(message.chat_id)
    if not user.id in user_ids_in_chat:
        if user.is_admin == False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chat not found"
            )

    return MessageReaderService().get_message_readers_for_message(message_id)