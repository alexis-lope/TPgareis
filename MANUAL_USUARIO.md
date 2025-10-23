# Manual de Usuario
## Sistema de Inventario para Comercio

---

## ÍNDICE

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Dashboard Principal](#dashboard-principal)
4. [Gestión de Productos](#gestión-de-productos)
5. [Gestión de Categorías](#gestión-de-categorías)
6. [Gestión de Proveedores](#gestión-de-proveedores)
7. [Movimientos de Inventario](#movimientos-de-inventario)
8. [Sistema de Alertas](#sistema-de-alertas)
9. [Gestión de Usuarios](#gestión-de-usuarios)
10. [Reportes](#reportes)
11. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## INTRODUCCIÓN

Bienvenido al Sistema de Inventario para Comercio. Este manual le guiará a través de todas las funcionalidades del sistema, permitiéndole gestionar eficientemente el inventario de su negocio.

### ¿Qué puede hacer con este sistema?

- ✅ Gestionar productos, categorías y proveedores
- ✅ Registrar entradas, salidas y ajustes de inventario
- ✅ Recibir alertas automáticas de stock bajo
- ✅ Visualizar estadísticas y reportes
- ✅ Administrar usuarios con diferentes roles

---

## ACCESO AL SISTEMA

### Iniciar Sesión

1. Abra su navegador web y acceda a la URL del sistema
2. Verá la página de inicio de sesión
3. Ingrese su correo electrónico y contraseña
4. Haga clic en "Iniciar Sesión"

**Usuarios de Prueba:**
- **Administrador**: admin@inventario.com / admin123
- **Gestor**: gestor@inventario.com / gestor123
- **Usuario**: usuario@inventario.com / usuario123

### Recuperar Contraseña

Si olvidó su contraseña:

1. Haga clic en "Olvidé mi contraseña"
2. Ingrese su correo electrónico
3. Recibirá un email con un enlace para restablecer su contraseña
4. Haga clic en el enlace y establezca una nueva contraseña

### Cerrar Sesión

Para cerrar sesión de forma segura:

1. Haga clic en su nombre de usuario en la barra lateral
2. Seleccione "Cerrar Sesión"

---

## DASHBOARD PRINCIPAL

El Dashboard es la página principal del sistema y muestra información resumida de su inventario.

### Elementos del Dashboard

#### 1. Estadísticas Principales

Cuatro tarjetas muestran métricas clave:

- **Total Productos**: Cantidad total de productos en el inventario
- **Valor Inventario**: Valor monetario total del inventario
- **Productos Bajo Stock**: Cantidad de productos que necesitan reabastecimiento
- **Movimientos Hoy**: Cantidad de movimientos registrados en el día

Cada tarjeta muestra:
- Valor actual
- Porcentaje de cambio respecto al mes anterior
- Indicador visual (flecha arriba/abajo)

#### 2. Productos Recientes

Lista de los últimos productos agregados al sistema con:
- Nombre del producto
- Stock actual
- Precio
- Indicador de stock bajo (si aplica)

#### 3. Alertas del Sistema

Notificaciones importantes sobre:
- Productos con stock bajo o crítico
- Nuevos proveedores agregados
- Actualizaciones de precios
- Reabastecimientos completados

### Navegación

La barra lateral izquierda contiene el menú principal:

- 📊 **Dashboard**: Página principal
- 📦 **Productos**: Gestión de productos
- 📁 **Categorías**: Gestión de categorías
- 🚚 **Proveedores**: Gestión de proveedores
- 🔄 **Movimientos**: Registro de movimientos
- ⚠️ **Alertas**: Sistema de alertas
- 👥 **Usuarios**: Gestión de usuarios (solo Admin)
- 📈 **Reportes**: Generación de reportes

---

## GESTIÓN DE PRODUCTOS

La sección de Productos le permite administrar todo su inventario.

### Ver Productos

1. Haga clic en "Productos" en el menú lateral
2. Verá una cuadrícula con todos los productos
3. Cada tarjeta muestra:
   - Nombre del producto
   - SKU (código único)
   - Categoría
   - Stock actual
   - Precio
   - Estado (Normal, Stock Bajo, Crítico)

### Buscar Productos

1. Use la barra de búsqueda en la parte superior
2. Puede buscar por:
   - Nombre del producto
   - SKU
   - Categoría
3. Los resultados se filtran automáticamente mientras escribe

### Crear Nuevo Producto

1. Haga clic en el botón "Nuevo Producto"
2. Complete el formulario:
   - **Nombre**: Nombre descriptivo del producto
   - **SKU**: Código único (ej: LAP-001)
   - **Descripción**: Detalles del producto (opcional)
   - **Categoría**: Seleccione de la lista
   - **Proveedor**: Seleccione de la lista (opcional)
   - **Precio**: Precio unitario
   - **Stock Inicial**: Cantidad inicial
   - **Stock Mínimo**: Nivel para generar alertas
3. Haga clic en "Guardar"

**Nota**: El SKU debe ser único en el sistema.

### Editar Producto

1. Localice el producto que desea editar
2. Haga clic en el botón "Editar"
3. Modifique los campos necesarios
4. Haga clic en "Guardar Cambios"

### Eliminar Producto

1. Localice el producto que desea eliminar
2. Haga clic en el botón de eliminar (ícono de papelera)
3. Confirme la acción

**Advertencia**: Esta acción no se puede deshacer. Se eliminarán también los movimientos asociados.

### Estados de Stock

Los productos se clasifican según su stock:

- 🟢 **Normal**: Stock por encima del mínimo
- 🟡 **Stock Bajo**: Stock igual o menor al mínimo
- 🔴 **Crítico**: Stock muy bajo (menos de 5 unidades)

---

## GESTIÓN DE CATEGORÍAS

Las categorías le ayudan a organizar sus productos.

### Ver Categorías

1. Haga clic en "Categorías" en el menú
2. Verá tarjetas con todas las categorías
3. Cada tarjeta muestra:
   - Nombre de la categoría
   - Descripción
   - Cantidad de productos en esa categoría

### Crear Nueva Categoría

1. Haga clic en "Nueva Categoría"
2. Complete:
   - **Nombre**: Nombre de la categoría
   - **Descripción**: Breve descripción (opcional)
3. Haga clic en "Guardar"

### Editar Categoría

1. Localice la categoría
2. Haga clic en "Editar"
3. Modifique los campos
4. Guarde los cambios

### Eliminar Categoría

**Importante**: No puede eliminar una categoría que tenga productos asociados. Primero debe reasignar o eliminar esos productos.

---

## GESTIÓN DE PROVEEDORES

Administre la información de sus proveedores.

### Ver Proveedores

1. Acceda a "Proveedores" en el menú
2. Verá tarjetas con información de cada proveedor:
   - Nombre de la empresa
   - Nombre del contacto
   - Email
   - Teléfono
   - Cantidad de productos que suministra
   - Estado (Activo/Inactivo)

### Crear Nuevo Proveedor

1. Haga clic en "Nuevo Proveedor"
2. Complete el formulario:
   - **Nombre**: Nombre de la empresa
   - **Contacto**: Nombre de la persona de contacto
   - **Email**: Correo electrónico
   - **Teléfono**: Número de contacto
   - **Dirección**: Dirección física (opcional)
3. Haga clic en "Guardar"

### Editar Proveedor

1. Localice el proveedor
2. Haga clic en "Editar"
3. Actualice la información
4. Guarde los cambios

### Desactivar Proveedor

Si ya no trabaja con un proveedor pero desea mantener su historial:

1. Edite el proveedor
2. Cambie el estado a "Inactivo"
3. Guarde los cambios

---

## MOVIMIENTOS DE INVENTARIO

Registre todas las entradas, salidas y ajustes de su inventario.

### Ver Movimientos

1. Acceda a "Movimientos" en el menú
2. Verá el historial completo de movimientos
3. Cada movimiento muestra:
   - Tipo (Entrada, Salida, Ajuste)
   - Producto afectado
   - Cantidad
   - Usuario que lo registró
   - Fecha y hora

### Tipos de Movimientos

#### 🟢 Entrada
Incrementa el stock del producto. Use para:
- Compras a proveedores
- Devoluciones de clientes
- Producción interna

#### 🔴 Salida
Disminuye el stock del producto. Use para:
- Ventas a clientes
- Devoluciones a proveedores
- Productos dañados o vencidos

#### 🔵 Ajuste
Corrige el stock del producto. Use para:
- Corrección de errores
- Inventario físico
- Mermas o pérdidas

### Registrar Nuevo Movimiento

1. Haga clic en "Nuevo Movimiento"
2. Complete el formulario:
   - **Producto**: Seleccione de la lista
   - **Tipo**: Entrada, Salida o Ajuste
   - **Cantidad**: Número de unidades
   - **Motivo**: Descripción del movimiento
3. Haga clic en "Registrar"

**El sistema automáticamente:**
- Actualiza el stock del producto
- Registra quién hizo el movimiento
- Genera alertas si el stock queda bajo

### Historial de Movimientos

Para ver el historial de un producto específico:

1. Vaya a la sección de Productos
2. Seleccione el producto
3. Haga clic en "Ver Historial"

---

## SISTEMA DE ALERTAS

El sistema genera alertas automáticas para mantenerlo informado.

### Ver Alertas

1. Acceda a "Alertas" en el menú
2. Verá todas las alertas ordenadas por fecha
3. Las alertas no leídas se destacan con un borde azul

### Tipos de Alertas

#### 🔴 Crítico
- Stock crítico (menos de 5 unidades)
- Requiere acción inmediata

#### 🟡 Advertencia
- Stock bajo (igual o menor al mínimo)
- Planifique reabastecimiento

#### 🔵 Información
- Nuevos proveedores
- Actualizaciones de precios
- Cambios en el sistema

#### 🟢 Éxito
- Reabastecimientos completados
- Operaciones exitosas

### Gestionar Alertas

**Marcar como leída:**
1. Haga clic en la alerta
2. Se marcará automáticamente como leída

**Marcar todas como leídas:**
1. Haga clic en "Marcar todas como leídas"
2. Todas las alertas pendientes se marcarán

**Eliminar alerta:**
1. Haga clic en la "X" en la esquina de la alerta
2. La alerta se eliminará

---

## GESTIÓN DE USUARIOS

**Nota**: Esta sección solo está disponible para usuarios con rol de Administrador.

### Ver Usuarios

1. Acceda a "Usuarios" en el menú
2. Verá tarjetas con información de cada usuario:
   - Nombre
   - Email
   - Rol (Admin, Gestor, Usuario)
   - Estado (Activo/Inactivo)
   - Último acceso

### Roles y Permisos

#### 👑 Administrador
- Acceso completo a todas las funciones
- Puede gestionar usuarios
- Puede eliminar cualquier registro

#### 👔 Gestor
- Gestión de productos, categorías y proveedores
- Registro de movimientos
- Visualización de reportes
- NO puede gestionar usuarios

#### 👤 Usuario
- Solo lectura de productos y categorías
- Visualización de reportes básicos
- NO puede editar ni eliminar

### Crear Nuevo Usuario

1. Haga clic en "Nuevo Usuario"
2. Complete el formulario:
   - **Nombre**: Nombre completo
   - **Email**: Correo electrónico (será el usuario de login)
   - **Contraseña**: Contraseña inicial
   - **Rol**: Seleccione el rol apropiado
3. Haga clic en "Crear Usuario"

**El usuario recibirá un email con sus credenciales.**

### Editar Usuario

1. Localice el usuario
2. Haga clic en "Editar"
3. Puede modificar:
   - Nombre
   - Email
   - Rol
   - Estado
4. Guarde los cambios

**Nota**: No puede cambiar su propio rol.

### Desactivar Usuario

En lugar de eliminar usuarios, es recomendable desactivarlos:

1. Edite el usuario
2. Cambie el estado a "Inactivo"
3. Guarde los cambios

El usuario no podrá iniciar sesión pero se mantiene su historial.

---

## REPORTES

Genere reportes para analizar su inventario.

### Tipos de Reportes Disponibles

#### 📦 Reporte de Inventario
Incluye:
- Lista completa de productos
- Stock actual de cada producto
- Valor unitario y total
- Estado de stock

#### 📈 Reporte de Movimientos
Incluye:
- Historial de todos los movimientos
- Filtrado por fecha
- Tipo de movimiento
- Usuario responsable

#### 💰 Reporte Financiero
Incluye:
- Valor total del inventario
- Valor por categoría
- Productos más valiosos
- Análisis de costos

#### ⚠️ Reporte de Alertas
Incluye:
- Productos con stock bajo
- Productos con stock crítico
- Recomendaciones de reabastecimiento

### Generar Reporte

1. Acceda a "Reportes" en el menú
2. Seleccione el tipo de reporte
3. (Opcional) Configure filtros:
   - Rango de fechas
   - Categorías específicas
   - Proveedores
4. Haga clic en "Descargar Reporte"
5. El reporte se descargará en formato PDF o Excel

### Programar Reportes Automáticos

Los administradores pueden configurar reportes automáticos:

1. Vaya a Configuración > Reportes Automáticos
2. Seleccione el tipo de reporte
3. Configure la frecuencia (diaria, semanal, mensual)
4. Ingrese los emails de destino
5. Active el reporte automático

---

## PREGUNTAS FRECUENTES

### ¿Cómo cambio mi contraseña?

1. Haga clic en su nombre de usuario
2. Seleccione "Mi Perfil"
3. Haga clic en "Cambiar Contraseña"
4. Ingrese su contraseña actual y la nueva
5. Guarde los cambios

### ¿Qué hago si el stock no coincide con el inventario físico?

Use un movimiento de tipo "Ajuste":

1. Vaya a Movimientos > Nuevo Movimiento
2. Seleccione el producto
3. Tipo: Ajuste
4. Cantidad: Diferencia (positiva o negativa)
5. Motivo: "Ajuste por inventario físico"

### ¿Puedo importar productos desde Excel?

Actualmente el sistema no soporta importación masiva. Esta función está planificada para futuras versiones.

### ¿Cómo configuro las alertas de email?

Los administradores pueden configurar alertas de email en:

1. Configuración > Notificaciones
2. Active "Enviar alertas por email"
3. Configure los destinatarios
4. Seleccione los tipos de alertas a enviar

### ¿El sistema funciona sin internet?

No, el sistema requiere conexión a internet para funcionar correctamente.

### ¿Puedo usar el sistema en mi teléfono?

Sí, el sistema es completamente responsivo y funciona en:
- Computadoras de escritorio
- Tablets
- Teléfonos móviles

### ¿Cómo obtengo soporte técnico?

Para soporte técnico:
- Email: soporte@inventario.com
- Teléfono: +54 11 1234-5678
- Horario: Lunes a Viernes, 9:00 - 18:00

---

## CONSEJOS Y MEJORES PRÁCTICAS

### Para Administradores

1. **Revise las alertas diariamente** para mantener el stock óptimo
2. **Configure stocks mínimos realistas** basados en su rotación
3. **Realice inventarios físicos periódicos** y ajuste el sistema
4. **Capacite a los usuarios** en el uso correcto del sistema
5. **Haga respaldos regulares** de la base de datos

### Para Gestores

1. **Registre los movimientos inmediatamente** para mantener datos actualizados
2. **Use motivos descriptivos** en los movimientos para facilitar auditorías
3. **Verifique los reportes semanalmente** para detectar tendencias
4. **Mantenga actualizada la información de proveedores**

### Para Usuarios

1. **Verifique el stock antes de prometer productos** a clientes
2. **Reporte discrepancias** inmediatamente a su supervisor
3. **Use la búsqueda** para encontrar productos rápidamente
4. **Consulte los reportes** para tomar decisiones informadas

---

**Versión del Manual**: 1.0  
**Última Actualización**: Enero 2025  
**Sistema**: Inventario para Comercio v1.0
