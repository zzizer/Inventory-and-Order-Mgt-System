from django.db import models
import uuid
from user_accounts_mgt.models import User

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name="processed_%(class)ss")

    class Meta:
        abstract = True
        ordering = ['-created_at']

class Category(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"

class Customer(BaseModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, unique=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.email})"

class Product(BaseModel):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} - ${self.price}"

class Order(BaseModel):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PROCESSING = 'PROCESSING', 'Processing'
        SHIPPED = 'SHIPPED', 'Shipped'
        DELIVERED = 'DELIVERED', 'Delivered'
        CANCELLED = 'CANCELLED', 'Cancelled'
        RETURNED = 'RETURNED', 'Returned'
        REFUNDED = 'REFUNDED', 'Refunded'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'
        ON_HOLD = 'ON_HOLD', 'On Hold'
        AWAITING_PAYMENT = 'AWAITING_PAYMENT', 'Awaiting Payment'
        AWAITING_FULFILLMENT = 'AWAITING_FULFILLMENT', 'Awaiting Fulfillment'
        AWAITING_SHIPMENT = 'AWAITING_SHIPMENT', 'Awaiting Shipment'
        PICKED_UP = 'PICKED_UP', 'Picked Up'
        CLOSED = 'CLOSED', 'Closed'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    order_status = models.CharField(max_length=30, choices=Status.choices, default=Status.PENDING)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.name}"

class OrderItem(BaseModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Copy of product price

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"
