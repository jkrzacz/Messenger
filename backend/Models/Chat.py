from datetime import datetime
from pydantic import BaseModel, Field

class Chat(BaseModel):
    id: int
    creator_id: int
    create_datetime: datetime
    name: str

class CreateChat(BaseModel):
    name: str