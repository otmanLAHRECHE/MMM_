from django.contrib.auth.base_user import BaseUserManager

from django.utils import timezone

class UserManager(BaseUserManager):

    def _create_user(self, user_name, type, password, is_staff,is_active, is_superuser, **extra_fields):
        if not user_name:
            raise ValueError('Users must have an user name')
        now = timezone.now()
        user = self.model(
            user_name=user_name,
            type = type,
            is_staff=is_staff,
            is_active=is_active,
            is_superuser=is_superuser,
            last_login=now,
            date_joined=now,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, user_name, type, password, **extra_fields):
        return self._create_user(user_name, type, password, False, False, False, **extra_fields)

    def create_superuser(self, user_name, type, password, **extra_fields):
        user = self._create_user(user_name, type, password, True, True, True, **extra_fields)
        user.save(using=self._db)
        return user