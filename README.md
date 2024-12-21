# Aplicación Node.js de ejemplo para ECS

Este repositorio contiene una aplicación simple de Node.js que se puede desplegar en Amazon ECS utilizando GitHub Actions.

**Descripción:**

Esta aplicación de ejemplo muestra cómo configurar un pipeline de CI/CD para desplegar automáticamente una aplicación Node.js en un clúster de Amazon ECS cada vez que se realiza un push a la rama principal del repositorio.

**Características:**

* Utiliza Docker para contenerizar la aplicación.
* Utiliza Amazon ECR para almacenar la imagen de Docker.
* Utiliza GitHub Actions para automatizar el proceso de construcción y despliegue.
* Utiliza Amazon ECS para ejecutar la aplicación en un entorno de contenedores.


## Instrucciones

### 1. Requisitos previos

* **Cuenta de AWS:** Necesitas una cuenta de AWS con permisos para crear y administrar recursos de ECS, ECR e IAM.
* **Docker:** Asegúrate de tener Docker instalado en tu máquina local.
* **Git:** Necesitas Git instalado en tu máquina local para clonar este repositorio.
* **Cuenta de GitHub:** Necesitas una cuenta de GitHub para utilizar GitHub Actions.
* **AWS CLI:** Instala y configura la AWS CLI en tu máquina local.


### 2. Configurar AWS

1. **Crea un repositorio ECR:**
    * Ve a la consola de Amazon ECR.
    * Crea un nuevo repositorio para almacenar la imagen Docker de tu aplicación. Dale un nombre descriptivo, por ejemplo, "mi-aplicacion-nodejs".

2. **Crea un clúster ECS:**
    * Ve a la consola de Amazon ECS.
    * Crea un nuevo clúster. Puedes elegir entre Fargate o EC2. Dale un nombre al clúster, por ejemplo, "mi-cluster".

3. **Crea una definición de tarea:**
    * En la consola de ECS, ve a "Task Definitions".
    * Crea una nueva definición de tarea.
    * Selecciona "Fargate" o "EC2" según el tipo de clúster que hayas creado.
    * Configura la definición de la tarea con los siguientes parámetros:
        * **Nombre de la tarea:** Dale un nombre a tu tarea, por ejemplo, "mi-aplicacion-nodejs-tarea".
        * **Imagen de contenedor:**  `${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ vars.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY_NAME }}:${{ github.sha }}`
        * **Asignación de puertos:** Mapea el puerto 3000 del contenedor al puerto 80 del host.
        * **Variables de entorno:** Define las variables de entorno necesarias para tu aplicación, como `PORT` con valor `3000` y `NODE_ENV` con valor `production`.

4. **Crea un servicio ECS:**
    * En la consola de ECS, ve a "Clusters".
    * Selecciona el clúster que creaste en el paso anterior.
    * Ve a la pestaña "Services".
    * Crea un nuevo servicio.
    * Configura el servicio con los siguientes parámetros:
        * **Nombre del servicio:** Dale un nombre a tu servicio, por ejemplo, "mi-aplicacion-nodejs-servicio".
        * **Número de tareas:** 1
        * **Definición de tarea:** Selecciona la definición de tarea que creaste en el paso anterior.
        * **Tipo de lanzamiento:** "Rolling update"
        * **Balanceador de carga:** Si deseas exponer tu aplicación a Internet, configura un balanceador de carga.


### 3. Configurar GitHub Actions

1. **Clona este repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    ```
    Reemplaza `tu-usuario/tu-repositorio` con la URL de tu repositorio.

2. **Crea los secretos de GitHub:**
    * En la configuración de tu repositorio de GitHub, ve a "Settings" -> "Secrets and variables" -> "Actions".
    * Crea los siguientes secretos:
        * `AWS_ACCESS_KEY_ID`: Tu clave de acceso de AWS.
        * `AWS_SECRET_ACCESS_KEY`: Tu clave secreta de AWS.
        * `AWS_ACCOUNT_ID`: Tu ID de cuenta de AWS.
        * `AWS_REGION`: La región de AWS donde desplegarás tu aplicación (por ejemplo, 'us-east-1').
        * `ECR_REPOSITORY_NAME`: El nombre del repositorio ECR que creaste (por ejemplo, 'mi-aplicacion-nodejs').
        * `ECS_CLUSTER_NAME`: El nombre del clúster ECS que creaste (por ejemplo, 'mi-cluster').
        * `ECS_SERVICE_NAME`: El nombre del servicio ECS que creaste (por ejemplo, 'mi-aplicacion-nodejs-servicio').
        * `ECS_TASK_DEFINITION_ARN`: El ARN de la definición de tarea que creaste en AWS. Puedes encontrarlo en la consola de ECS.

3. **Modifica el archivo `deploy.yml`:**
    * El archivo `.github/workflows/deploy.yml` define el flujo de trabajo de GitHub Actions.
    * Puedes modificarlo para adaptarlo a tu configuración, por ejemplo, cambiando la versión de Node.js o la región de AWS.


### 4. Ejecutar la aplicación

1. **Haz un push a la rama `main`:**
    * Cualquier cambio que envíes a la rama `main` activará el flujo de trabajo de GitHub Actions.

2. **Monitoriza el despliegue:**
    * En la pestaña "Actions" de tu repositorio de GitHub, puedes monitorizar el progreso del despliegue.

3. **Verifica el despliegue:**
    * Una vez que el despliegue se haya completado, verifica que tu aplicación se esté ejecutando correctamente en ECS.
    * Si configuraste un balanceador de carga, accede a la URL del balanceador de carga.
    * Si no configuraste un balanceador de carga, puedes acceder a la aplicación a través de la IP pública de tu instancia EC2.


## Verificar el despliegue

* **Accede a la URL de tu aplicación:** Abre un navegador web e ingresa la URL de tu aplicación. Deberías ver el mensaje "¡Hola desde mi aplicación Node.js en ECS!".
* **Revisa los logs de la aplicación:** En la consola de Amazon ECS, puedes ver los logs de tu aplicación para verificar que se esté ejecutando correctamente. Ve a la sección "Tasks" de tu clúster y selecciona la tarea en ejecución.
* **Monitoriza las métricas:** Utiliza CloudWatch para monitorizar las métricas de tu aplicación, como el uso de CPU y memoria.


## Notas adicionales

* Este es un ejemplo básico de cómo desplegar una aplicación Node.js en ECS con GitHub Actions.
* Puedes personalizar este flujo de trabajo para adaptarlo a tus necesidades específicas.
* Asegúrate de seguir las mejores prácticas de seguridad al configurar tus recursos de AWS y GitHub Actions.
* Este ejemplo utiliza la última versión de Node.js (22). Puedes cambiar la versión en el archivo `deploy.yml` si es necesario.
* Asegúrate de que el puerto que defines en la variable de entorno `PORT` coincide con el puerto mapeado en la definición de la tarea de ECS.

Este README.md proporciona una guía completa para desplegar una aplicación Node.js en ECS utilizando GitHub Actions. Recuerda que debes adaptar las instrucciones a tu configuración específica y seguir las mejores prácticas de seguridad.
