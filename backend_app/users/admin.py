from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission
from django.utils.translation import gettext as _

# Register your models here.
from import_export import resources
from import_export.admin import ImportExportModelAdmin

from .models import CustomUser


# @admin.register(CustomUser)
# class UserAdmin(ImportExportModelAdmin, BaseUserAdmin):

#     def get_queryset(self, request):
#         qs = super().get_queryset(request)
#         return qs

#     ordering = ['id']
#     list_display = ['id', 'name', 'email', 'mobile']
#     search_fields = ['name', 'email', 'mobile']

#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         (_('Personal Info'), {'fields': ('name',
#                                          'mobile',
                                     
#                                          )}),
#         (
#             _('Permissions'),
#             {
#                 'fields': (
#                     'is_active',
#                     'is_staff',
#                     'is_superuser'
#                 )
#             }
#         ),
#         (_('Important dates'), {'fields': ('last_login',)}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('name', 'email', 'password','groups')

#         }),
#         (_('Personal Info'), {'fields': ('name', 'mobile')}),
#         (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')})
#     )



class PermissionResource(resources.ModelResource):
    class Meta:
        model = Permission


class PermissionAdmin(admin.ModelAdmin):
    resource_class = PermissionResource
    search_fields = ['name', 'codename']
    list_display = ('id', 'name', 'content_type', 'codename')

    def save_model(self, request, obj, form, change):
        if change:
            obj.updated_by = request.user
        else:
            obj.created_by = request.user

        super().save_model(request, obj, form, change)


admin.site.register(Permission, PermissionAdmin)