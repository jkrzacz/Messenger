from pydantic import BaseModel, Field

class User(BaseModel):
    id: int
    email: str
    is_admin: bool

class SystemUser(User):
    password: str