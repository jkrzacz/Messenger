from datetime import datetime
from pydantic import BaseModel, Field

class Message(BaseModel):
    id: int
    chat_id: int
    user_id: int
    create_datetime: datetime
    message : str

class CreateMessage(BaseModel):
    chat_id: int
    user_id: int
    message : str