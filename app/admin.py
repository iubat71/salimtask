from django.contrib import admin

# Register your models here.
from .models import Users, Auctions

admin.site.register(Users)
admin.site.register(Auctions)