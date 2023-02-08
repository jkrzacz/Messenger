import uvicorn
from Services.FacebookService import FacebookService

if __name__ == '__main__':
    # username= 'fb_name'
    # fb_token = 'EAATo30glnncBADksfjVj3CoiXTYZAUOaPgwZBQVUvHowvWQkUQ81lDaFIcLmWTp4JlGhMVyMe4dVdGVQsveBhOZBzgM9vrHZBDiemSyIZC7zx4ZCLShm4mKANdZBZAtYcZCttYPZA9vIAyPxsjyviBzsY8oQJuDVGY3qP5HCBXm76z5g4yfGQIIWolrLau84O1cqbHTXlEiShS8FmEe6mHXrOv'
    # user = FacebookService().get_user_for_token(username, fb_token)
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080,
        log_level="info",
        reload=True
    )
