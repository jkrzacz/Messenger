from datetime import datetime
from pydantic import BaseModel, Field

class MessageReader(BaseModel):
    message_id: int
    user_id: int
    read_datetime: datetime

class CreateMessageReader(BaseModel):
    message_id: int
    user_id: int