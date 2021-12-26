from django.urls import include, path
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()


urlpatterns = [
    path('api/', include(router.urls), name='api'),
    path('api/signup/', SignUpView.as_view(), name="sign_up"),
    path('api/login/', LoginView.as_view(), name="login"),
    path('api/token/access/', TokenGenerateView.as_view(), name="access"),
    path('api/logout/', LogoutView.as_view(), name="logout"),
    path('api/ticket/create/', TicketCreateView.as_view(), name="create_ticket"),
    path('api/ticket/update/<int:pk>', TicketUpdateView.as_view(), name="update_ticket"),
    path('api/tickets/', TicketListView.as_view(), name="ticket_list"),
    path('api/tickets/<int:pk>', TicketDetailView.as_view(), name="product_detail"),
    path('api/permission_list/', PermissionList.as_view(), name="permission_list"),
    path('api/role_list/', RoleListView.as_view(), name="role_list"),
    path('api/role_create/', RoleCreateView.as_view(), name="role_create"),
    path('api/employee/', EmployeeView.as_view(), name="getAllemployee"),
    path('api/employee/<int:pk>', EmployeeViewGetByID.as_view(), name="getAllemployeebyid"),
    path('api/students/', StudentView.as_view(), name="getStudents"),
    path('api/students/<int:pk>', StudentViewGetByID.as_view(), name="getStudentsbyid"),
    path('api/dashboard_data/', DashboardView.as_view(), name="DashboardView"),

]