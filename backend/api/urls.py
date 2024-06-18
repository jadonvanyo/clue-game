from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]