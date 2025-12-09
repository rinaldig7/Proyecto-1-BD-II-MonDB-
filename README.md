# GlobalMarket Analytics & Search Engine 🚀

**Universidad Nacional Experimental de Guayana (UNEG)**
**Departamento de Ciencia y Tecnología**
**Asignatura:** Sistemas de Bases de Datos II (NoSQL / MongoDB)
**Semestre:** 2025-II
**Profesora:** Clinia Cordero

![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Status](https://img.shields.io/badge/Status-Entregado-blue?style=for-the-badge)

## 📖 Descripción del Proyecto

Este proyecto aborda la migración y optimización de la infraestructura de datos para **GlobalMarket**, una startup de comercio electrónico en expansión. 

El objetivo principal fue migrar de un sistema relacional (SQL) que presentaba problemas de rendimiento a una arquitectura documental en **MongoDB Atlas**. La solución implementada incluye un catálogo de productos flexible, validaciones estrictas de integridad, un motor de búsqueda eficiente y un dashboard de análisis en tiempo real.

## 🛠️ Tecnologías y Herramientas

* **Base de Datos:** MongoDB Atlas (Cluster M0 - Free Tier)
* **Gestión y Carga:** MongoDB Compass / MongoImport
* **Visualización:** MongoDB Charts
* **Lenguajes:** MQL (MongoDB Query Language), JavaScript (para scripts de validación)

## 📂 Estructura del Repositorio

```text
📦 Proyecto-1-BD-II-MongoDB
 ┣ 📂 data
 ┃ ┗ 📜 dataset.json          # Dataset fuente (E-commerce data)
 ┣ 📂 scripts
 ┃ ┣ 📜 validation.js         # Reglas de validación JSON (Schema Validation)
 ┃ ┣ 📜 queries.js            # Pipelines de agregación (Reportes, Buckets, Top Products)
 ┃ ┗ 📜 indexes.js            # Definición de índices y configuración Atlas Search
 ┣ 📜 Reporte_Tecnico.pdf     # Documentación de rendimiento y diseño
 ┗ 📜 README.md               # Guía de despliegue e instalación
⚡ Características Implementadas
1. Modelado y Validación (Schema Design)
Diseño Híbrido: Se implementó una estrategia de Embedding para detalles de ventas (evitando Joins excesivos) y Referencing para entidades maestras.
Integridad: Reglas de validación JSON activas en Atlas para asegurar tipos de datos correctos (ej. precios numéricos positivos, emails válidos).
2. Consultas Avanzadas (Aggregation Framework)
Se desarrollaron pipelines complejos para inteligencia de negocios:
Reporte de Ventas: Cálculo de ingresos totales por categoría y temporalidad.
Análisis de Productos: Identificación de productos con mejor calificación y alto volumen de reseñas.
Segmentación de Precios: Uso del patrón $bucket para clasificar inventario automáticamente (Bajo, Medio, Alto).
3. Búsqueda y Optimización
Atlas Search: Índice Lucene para permitir búsqueda difusa (fuzzy search) en el catálogo.
Indexación: Índices compuestos estratégicos para reducir el Query Targeting.
Performance: Reducción drástica en tiempos de respuesta verificada mediante Explain Plans.
🚀 Instrucciones de Instalación
Para replicar este proyecto en tu entorno local o nube:
📊 Dashboard (MongoDB Charts)
Se diseñó un dashboard interactivo para visualizar los KPIs del negocio:
Gráfico de barras: Ventas totales por región.
Gráfico circular: Distribución de inventario por categoría.
👥 Equipo de Desarrollo
[Nombre del Integrante 1]
[Nombre del Integrante 2]
[Nombre del Integrante 3]
Proyecto realizado como evaluación del Tema VIII: Sistemas de Bases de Datos Documentales.
