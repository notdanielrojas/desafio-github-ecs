# Desafío 3 - DevOps: Despliegue de Servidor Web Node.js en ECS

Este proyecto implementa un servidor web básico utilizando Node.js y Express. El objetivo es desplegar este código en una instancia de ECS en AWS utilizando un pipeline de CI/CD con GitHub Actions.

## Requisitos

* **Docker:** Instalado en tu máquina local.
* **Cuenta de AWS:** Con permisos para crear y administrar recursos de ECS, ECR e IAM.
* **Node.js y npm:** Instalados localmente.
* **Git:** Configurado en tu máquina local.

## Configuración de Secretos en GitHub Actions

Para que el flujo de trabajo de GitHub Actions pueda interactuar con tu cuenta de AWS y tus recursos, debes configurar los siguientes secretos en tu repositorio:

* **`AWS_ACCESS_KEY_ID`**: Tu clave de acceso de AWS.
* **`AWS_SECRET_ACCESS_KEY`**: Tu clave secreta de AWS.
* **`ECR_REPOSITORY`**: El nombre del repositorio ECR donde se almacenará la imagen Docker.
* **`ECS_CLUSTER`**: El nombre del clúster ECS donde se desplegará la aplicación.
* **`ECS_SERVICE_NAME`**: El nombre del servicio ECS que se actualizará con la nueva imagen.
* **`ECS_TASK_DEFINITION_ARN`**: El ARN de la definición de tarea de ECS.

**Para configurar los secretos:**

1. Ve a la sección **Settings** de tu repositorio en GitHub.
2. Navega a **Secrets and variables > Actions**.
3. Crea nuevos secretos con los nombres y valores indicados.

## Flujo de Trabajo de GitHub Actions

El archivo `.github/workflows/ecs.yml` define el flujo de trabajo de GitHub Actions que automatiza el proceso de construcción y despliegue. Este flujo de trabajo realiza las siguientes acciones:

1. **Inicio de sesión en ECR:** Se autentica en tu repositorio de ECR para poder subir la imagen Docker.
2. **Construcción de la imagen:** Construye una imagen Docker de tu aplicación, etiquetándola con el hash del commit para su trazabilidad.
3. **Push a ECR:** Sube la imagen Docker construida al repositorio de ECR.
4. **Despliegue en ECS:** Actualiza el servicio ECS especificado para que utilice la nueva imagen Docker que se ha subido a ECR.

## Acceso al Servidor

Una vez que el flujo de trabajo de GitHub Actions se complete con éxito, tu servidor web estará desplegado y disponible. 

Para acceder a él, necesitas la URL pública donde está accesible. 
