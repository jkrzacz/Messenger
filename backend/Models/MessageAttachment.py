from pydantic import BaseModel

class MessageAttachment(BaseModel):
    id: int
    message_id: int
    type: str
    attachment: str

class CreateMessageAttachment(BaseModel):
    message_id: int
    type: str
    attachment: str