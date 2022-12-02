
from django.contrib import admin
from django.urls import path,include,re_path

from rest_framework.urlpatterns import format_suffix_patterns
from django.views.generic import TemplateView
urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
    path('', include('app.urls')),
    path('api/auth/', include('knox.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

]

urlpatterns = format_suffix_patterns(urlpatterns)