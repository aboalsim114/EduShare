from django.contrib import admin
from .models import Cours, Commentaires, User , Forum

# Register your models here.

admin.site.register(Cours)
admin.site.register(Commentaires)
admin.site.register(User)
admin.site.register(Forum)
