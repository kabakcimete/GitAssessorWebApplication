from django.urls import path,include
from .views import *

urlpatterns = [
    path("",home),
    path("assess/",assess),
    path("register/",register_request),
    path("login/",login_request),
    path("logout/",logout_request)
]
