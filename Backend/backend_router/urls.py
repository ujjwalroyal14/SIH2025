from django.urls import path
from backend_router import views
from .views import log_in
from .views import logout




from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)

urlpatterns = [
    path('register/', views.sign_in, name="sign_in"),
    path('login/', views.log_in, name="login"),
    path('current_user/', views.current_user, name="current_user"),
    path('logout/', views.logout, name='logout'),
    path('log_in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]