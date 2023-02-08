from typing import Optional
from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    name: str
    is_admin: bool

class SystemUser(User):
    password: Optional[str]
    fb_id: Optional[str]