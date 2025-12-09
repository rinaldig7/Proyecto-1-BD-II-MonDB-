// ==============================================
// VALIDATION.JS - Esquema de validación MongoDB
// Proyecto: GlobalMarket Analytics & Search Engine
// ==============================================

// Base de datos: globalmarket
use("globalmarket");

// ==============================================
// 1. VALIDACIÓN PARA COLECCIÓN "products"
// ==============================================

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["product_id", "product_name", "category", "price"],
      properties: {
        product_id: {
          bsonType: "string",
          description: "ID único del producto (requerido)",
        },
        product_name: {
          bsonType: "string",
          minLength: 3,
          maxLength: 200,
          description: "Nombre del producto (3-200 caracteres)",
        },
        category: {
          bsonType: "string",
          enum: [
            "Technology",
            "Furniture",
            "Office Supplies",
            "Electronics",
            "Home Appliances",
          ],
          description: "Categoría válida del producto",
        },
        sub_category: {
          bsonType: "string",
          description: "Subcategoría del producto",
        },
        price: {
          bsonType: "double",
          minimum: 0,
          exclusiveMinimum: true,
          description: "Precio debe ser positivo y mayor que 0",
        },
        stock_quantity: {
          bsonType: "int",
          minimum: 0,
          description: "Cantidad en inventario no puede ser negativa",
        },
        description: {
          bsonType: "string",
          maxLength: 1000,
          description: "Descripción del producto",
        },
        ratings: {
          bsonType: "array",
          description: "Array de calificaciones embebidas",
          items: {
            bsonType: "object",
            required: ["user_id", "rating"],
            properties: {
              user_id: {
                bsonType: "string",
                description: "ID del usuario que califica",
              },
              rating: {
                bsonType: "int",
                minimum: 1,
                maximum: 5,
                description: "Calificación entre 1 y 5 estrellas",
              },
              comment: {
                bsonType: "string",
                maxLength: 500,
                description: "Comentario opcional",
              },
              date: {
                bsonType: "date",
                description: "Fecha de la calificación",
              },
            },
          },
        },
        average_rating: {
          bsonType: "double",
          minimum: 0,
          maximum: 5,
          description: "Calificación promedio calculada",
        },
        tags: {
          bsonType: "array",
          description: "Etiquetas para búsqueda",
          items: {
            bsonType: "string",
          },
        },
        created_at: {
          bsonType: "date",
          description: "Fecha de creación del producto",
        },
        updated_at: {
          bsonType: "date",
          description: "Fecha de última actualización",
        },
        is_active: {
          bsonType: "bool",
          description: "Estado activo/inactivo del producto",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

// ==============================================
// 2. VALIDACIÓN PARA COLECCIÓN "orders"
// ==============================================

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["order_id", "customer_id", "order_date", "status", "items"],
      properties: {
        order_id: {
          bsonType: "string",
          pattern: "^ORD-[0-9]{8}-[A-Z0-9]{6}$",
          description: "Formato: ORD-YYYYMMDD-XXXXXX",
        },
        customer_id: {
          bsonType: "string",
          description: "Referencia al cliente",
        },
        order_date: {
          bsonType: "date",
          description: "Fecha de la orden",
        },
        ship_date: {
          bsonType: "date",
          description: "Fecha de envío",
        },
        status: {
          bsonType: "string",
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          description: "Estado válido de la orden",
        },
        total_amount: {
          bsonType: "double",
          minimum: 0,
          description: "Monto total no negativo",
        },
        discount: {
          bsonType: "double",
          minimum: 0,
          maximum: 100,
          description: "Descuento entre 0-100%",
        },
        shipping_cost: {
          bsonType: "double",
          minimum: 0,
          description: "Costo de envío no negativo",
        },
        items: {
          bsonType: "array",
          minItems: 1,
          description: "Debe tener al menos un item",
          items: {
            bsonType: "object",
            required: ["product_id", "quantity", "unit_price"],
            properties: {
              product_id: {
                bsonType: "string",
                description: "ID del producto",
              },
              product_name: {
                bsonType: "string",
                description: "Nombre del producto",
              },
              quantity: {
                bsonType: "int",
                minimum: 1,
                maximum: 100,
                description: "Cantidad entre 1-100",
              },
              unit_price: {
                bsonType: "double",
                minimum: 0,
                description: "Precio unitario no negativo",
              },
              subtotal: {
                bsonType: "double",
                minimum: 0,
                description: "Subtotal calculado",
              },
            },
          },
        },
        shipping_address: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            country: { bsonType: "string" },
            postal_code: { bsonType: "string" },
          },
        },
        payment_method: {
          bsonType: "string",
          enum: [
            "credit_card",
            "debit_card",
            "paypal",
            "bank_transfer",
            "cash",
          ],
        },
        priority: {
          bsonType: "string",
          enum: ["low", "medium", "high", "critical"],
        },
      },
    },
  },
});

// ==============================================
// 3. VALIDACIÓN PARA COLECCIÓN "customers"
// ==============================================

db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customer_id", "customer_name", "email"],
      properties: {
        customer_id: {
          bsonType: "string",
          pattern: "^CUST-[A-Z0-9]{8}$",
          description: "Formato: CUST-XXXXXXX",
        },
        customer_name: {
          bsonType: "string",
          minLength: 2,
          maxLength: 100,
          description: "Nombre del cliente (2-100 caracteres)",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Formato de email válido",
        },
        segment: {
          bsonType: "string",
          enum: ["Consumer", "Corporate", "Home Office"],
        },
        phone: {
          bsonType: "string",
          pattern: "^\\+?[0-9\\s\\-\\(\\)]{10,}$",
          description: "Número de teléfono válido",
        },
        registration_date: {
          bsonType: "date",
          description: "Fecha de registro",
        },
        address: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            country: { bsonType: "string" },
            postal_code: { bsonType: "string" },
          },
        },
        total_spent: {
          bsonType: "double",
          minimum: 0,
          description: "Total gastado por el cliente",
        },
        order_count: {
          bsonType: "int",
          minimum: 0,
          description: "Número de órdenes realizadas",
        },
        is_active: {
          bsonType: "bool",
          description: "Cliente activo/inactivo",
        },
      },
    },
  },
});

// ==============================================
// 4. VALIDACIÓN PARA COLECCIÓN "reviews" (REFERENCIADA)
// ==============================================

db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "review_id",
        "product_id",
        "customer_id",
        "rating",
        "review_date",
      ],
      properties: {
        review_id: {
          bsonType: "string",
          description: "ID único de la reseña",
        },
        product_id: {
          bsonType: "string",
          description: "Referencia al producto",
        },
        customer_id: {
          bsonType: "string",
          description: "Referencia al cliente",
        },
        rating: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Calificación de 1 a 5 estrellas",
        },
        title: {
          bsonType: "string",
          maxLength: 200,
          description: "Título de la reseña",
        },
        comment: {
          bsonType: "string",
          maxLength: 2000,
          description: "Comentario detallado",
        },
        review_date: {
          bsonType: "date",
          description: "Fecha de la reseña",
        },
        helpful_votes: {
          bsonType: "int",
          minimum: 0,
          description: "Votos útiles",
        },
        verified_purchase: {
          bsonType: "bool",
          description: "Compra verificada",
        },
      },
    },
  },
});

// ==============================================
// 5. ÍNDICES RECOMENDADOS (para mejorar performance)
// ==============================================

// Índices para products
db.products.createIndex({ product_id: 1 }, { unique: true });
db.products.createIndex({ category: 1, sub_category: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ average_rating: -1 });

// Índices para orders
db.orders.createIndex({ order_id: 1 }, { unique: true });
db.orders.createIndex({ customer_id: 1 });
db.orders.createIndex({ order_date: -1 });
db.orders.createIndex({ status: 1 });
db.orders.createIndex({ total_amount: -1 });

// Índices para customers
db.customers.createIndex({ customer_id: 1 }, { unique: true });
db.customers.createIndex({ email: 1 }, { unique: true });
db.customers.createIndex({ segment: 1 });

// Índices para reviews
db.reviews.createIndex({ review_id: 1 }, { unique: true });
db.reviews.createIndex({ product_id: 1, rating: -1 });
db.reviews.createIndex({ customer_id: 1 });

// ==============================================
// 6. FUNCIONES DE HELPER PARA VALIDACIÓN
// ==============================================

// Función para validar un documento contra el schema
function validateDocument(collectionName, document) {
  try {
    const collection = db.getCollection(collectionName);
    const result = collection.validate(document);
    print(`✓ Documento válido para ${collectionName}`);
    return true;
  } catch (error) {
    print(`✗ Error en validación para ${collectionName}: ${error.message}`);
    return false;
  }
}

// Función para probar documentos de ejemplo
function testValidationExamples() {
  print("=== TESTING VALIDATION EXAMPLES ===");

  // Test 1: Producto válido
  const validProduct = {
    product_id: "PROD-001",
    product_name: "Laptop Gaming",
    category: "Technology",
    price: 999.99,
    stock_quantity: 50,
  };

  // Test 2: Producto inválido (precio negativo)
  const invalidProduct = {
    product_id: "PROD-002",
    product_name: "Mouse",
    category: "Technology",
    price: -10.99, // INVÁLIDO: precio negativo
  };

  // Test 3: Cliente válido
  const validCustomer = {
    customer_id: "CUST-001",
    customer_name: "Juan Pérez",
    email: "juan@example.com",
    segment: "Consumer",
  };

  // Test 4: Cliente inválido (email incorrecto)
  const invalidCustomer = {
    customer_id: "CUST-002",
    customer_name: "Ana López",
    email: "ana@example", // INVÁLIDO: email mal formado
    segment: "Corporate",
  };

  validateDocument("products", validProduct);
  validateDocument("products", invalidProduct);
  validateDocument("customers", validCustomer);
  validateDocument("customers", invalidCustomer);
}

// ==============================================
// 7. EJECUCIÓN PRINCIPAL
// ==============================================

print("========================================");
print("SISTEMA DE VALIDACIÓN MONGODB - GLOBALMARKET");
print("========================================");
print("Colecciones creadas con validación:");
print("1. products ✓");
print("2. orders ✓");
print("3. customers ✓");
print("4. reviews ✓");
print("========================================");
print("Índices creados para optimización");
print("========================================");
print("Para probar validaciones, ejecuta: testValidationExamples()");
print("========================================");
