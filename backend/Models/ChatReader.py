from pydantic import BaseModel, Field

class ChatReader(BaseModel):
    chat_id: int
    user_id: int