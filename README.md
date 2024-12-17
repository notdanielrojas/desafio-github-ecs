# Aplicación Node.js de ejemplo para ECS

Este repositorio contiene una aplicación simple de Node.js que se puede desplegar en Amazon ECS utilizando GitHub Actions.

## Instrucciones

### 1. Requisitos previos

* Cuenta de AWS con permisos para crear y administrar recursos de ECS, ECR e IAM.
* Docker instalado en tu máquina local.
* Git instalado en tu máquina local.
* Una cuenta de GitHub.

### 2. Configurar AWS

1. **Crea un repositorio ECR:** En la consola de Amazon ECR, crea un repositorio para almacenar la imagen Docker de tu aplicación.
2. **Crea un clúster ECS:** En la consola de Amazon ECS, crea un clúster para ejecutar tus tareas.
3. **Crea una definición de tarea:** Define la configuración de tu tarea, incluyendo la imagen de Docker, los puertos y las variables de entorno.
4. **Crea un servicio ECS:** Crea un servicio para ejecutar y mantener tus tareas en el clúster.
5. **Configura las variables de entorno:** En la definición de la tarea, configura las variables de entorno necesarias para tu aplicación, como `PORT` y `NODE_ENV`.

### 3. Configurar GitHub Actions

1. **Clona este repositorio:** `git clone https://github.com/tu-usuario/tu-repositorio.git`
2. **Crea los secretos de GitHub:** En la configuración de tu repositorio, ve a "Secrets and variables" -> "Actions" y crea los siguientes secretos:
    * `AWS_ACCESS_KEY_ID`: Tu clave de acceso de AWS.
    * `AWS_SECRET_ACCESS_KEY`: Tu clave secreta de AWS.
    * `ECR_REPOSITORY`: El nombre de tu repositorio ECR.
    * `ECS_CLUSTER`: El nombre de tu clúster ECS.
    * `ECS_SERVICE_NAME`: El nombre de tu servicio ECS.
3. **Modifica el archivo `deploy.yml`:** Si es necesario, modifica el archivo `.github/workflows/deploy.yml` para adaptarlo a tu configuración.

### 4. Ejecutar la aplicación

1. **Haz un push a la rama `main`:** Esto activará el flujo de trabajo de GitHub Actions.
2. **Monitoriza el despliegue:** En la consola de GitHub Actions, puedes monitorizar el progreso del despliegue.
3. **Verifica el despliegue:** Una vez que el despliegue se haya completado, verifica que tu aplicación se esté ejecutando correctamente en ECS. Puedes acceder a la aplicación a través del balanceador de carga o la IP pública de tu instancia EC2.

## Verificar el despliegue

* **Accede a la URL de tu aplicación:** Abre un navegador web e ingresa la URL de tu aplicación. Deberías ver el mensaje "¡Hola desde mi aplicación Node.js en ECS!".
* **Revisa los logs de la aplicación:** En la consola de Amazon ECS, puedes ver los logs de tu aplicación para verificar que se esté ejecutando correctamente.
* **Monitoriza las métricas:** Utiliza CloudWatch para monitorizar las métricas de tu aplicación, como el uso de CPU y memoria.

## Notas adicionales

* Este es un ejemplo básico de cómo desplegar una aplicación Node.js en ECS con GitHub Actions.
* Puedes personalizar este flujo de trabajo para adaptarlo a tus necesidades específicas.
* Asegúrate de seguir las mejores prácticas de seguridad al configurar tus recursos de AWS y GitHub Actions.