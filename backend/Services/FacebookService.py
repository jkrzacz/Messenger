import requests
from fastapi import status, HTTPException
from Services.UserService import UserService
from Models.User import SystemUser

FACEBOOK_ACCESS_TOKEN = '1381945592618615|f18c44cd77d29d2d446a50a4843ba75c'

class FacebookService:

    def get_user_for_token(self, name: str, fb_token: str) -> SystemUser:
        r = requests.get('https://graph.facebook.com/debug_token?input_token={0}&access_token={1}'.format(fb_token, FACEBOOK_ACCESS_TOKEN))
        json = r.json()
        is_valid = json["data"]["is_valid"]
        #if (is_valid == 'true') or (is_valid is True):
        if is_valid is True:
            fb_id = json["data"]["user_id"]
            userService = UserService()
            user = userService.get_user_for_name(name)
            if user is None:
                user = userService.add_user(False, name, None, fb_id)

            if user.fb_id == fb_id:
                return user

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect facebook token"
        )