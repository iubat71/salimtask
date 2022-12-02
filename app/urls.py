from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('auctions', views.AuctionViewSet)

urlpatterns = [
   
    path("auth/register/", views.RegistrationAPI.as_view()),
    path("auth/login/", views.LoginAPI.as_view()),
    path("auth/user/", views. UserAPI.as_view()),
    path("auth/logout/", views.LogoutAPI.as_view()),
    path('users/', views.UsersList.as_view()),
    path('auctions/', views.AuctionList.as_view()),
    path('auction/<int:id>', views.AuctionBid.as_view()),
    path('logout/', views.Logout.as_view()),


]