from django.urls import path
from .views import (
    CategoryListCreateAPIView, CategoryDetailAPIView,
    CustomerListCreateAPIView, CustomerDetailAPIView,
    ProductListCreateAPIView, ProductDetailAPIView,
    OrderListCreateAPIView, OrderDetailAPIView,
    OrderItemListCreateAPIView, OrderItemDetailAPIView
)

urlpatterns = [
    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<uuid:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list-create'),
    path('customers/<uuid:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),

    path('products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('products/<uuid:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),

    path('orders/', OrderListCreateAPIView.as_view(), name='order-list-create'),
    path('orders/<uuid:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),

    path('order-items/', OrderItemListCreateAPIView.as_view(), name='orderitem-list-create'),
    path('order-items/<uuid:pk>/', OrderItemDetailAPIView.as_view(), name='orderitem-detail'),
]
