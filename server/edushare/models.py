from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import MinValueValidator


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse e-mail est obligatoire")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Le superutilisateur doit avoir is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Le superutilisateur doit avoir is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)


""" --------------------------------------------------------------------- """


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    user_image = models.ImageField(upload_to="images", blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nom")
    university = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Université/École"
    )
    cours_achetes = models.ManyToManyField(
        "Cours", related_name="users_achetes", blank=True, verbose_name="Cours achetés"
    )
    cours_telecharges = models.ManyToManyField(
        "Cours",
        related_name="users_telecharges",
        blank=True,
        verbose_name="Cours téléchargés",
    )
    # Ces champs sont nécessaires pour utiliser le modèle User comme modèle d'authentification
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Définir le champ utilisé pour l'authentification
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = UserManager()

    @classmethod
    def get_by_natural_key(cls, username):
        return cls.objects.get(username=username)


class Cours(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField()
    contenu = models.FileField(upload_to="cours_content/", blank=True, null=True)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    prix = models.PositiveIntegerField(
        validators=[MinValueValidator(0)], verbose_name="Prix du cours"
    )
    ecole = models.CharField(max_length=255, verbose_name="École ou université")

    auteur = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="cours_created"
    )
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.titre

    def get_download_url(self):
        return self.contenu.url if self.contenu else None

    class Meta:
        verbose_name = "Cours"
        verbose_name_plural = "Cours"
        ordering = ["-created_at"]


class Commentaires(models.Model):
    message = models.TextField(null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cours = models.ForeignKey(Cours, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ["-created_at"]



class Forum(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    message  = models.TextField(null=False , blank=False)
    created_at = models.DateTimeField(auto_now_add=True) 


    def __str__(self) :
        return self.message
    

  