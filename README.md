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
* **`AWS_ACCOUNT_ID`**: Tu ID de cuenta de AWS.
* **`AWS_REGION`**: La región de AWS donde se encuentra tu clúster ECS (por ejemplo, 'us-east-1').
* **`ECR_REPOSITORY_NAME`**: El nombre del repositorio ECR donde se almacenará la imagen Docker.
* **`ECS_CLUSTER_NAME`**: El nombre del clúster ECS donde se desplegará la aplicación.
* **`ECS_SERVICE_NAME`**: El nombre del servicio ECS que se actualizará con la nueva imagen.
* **`ECS_TASK_DEFINITION_ARN`**: El ARN de la definición de tarea de ECS.

**Para configurar los secretos:**

1. Ve a la sección **Settings** de tu repositorio en GitHub.
2. Navega a **Secrets and variables > Actions**.
3. Crea nuevos secretos con los nombres y valores indicados.

## Flujo de Trabajo de GitHub Actions

El archivo `.github/workflows/ecs.yml` define el flujo de trabajo de GitHub Actions que automatiza el proceso de construcción y despliegue. 

**Pasos del flujo de trabajo:**

1. **Checkout code:** Descarga el código fuente del repositorio.
2. **Set up Node.js:** Instala la versión 22 de Node.js en el entorno de ejecución.
3. **Install dependencies:** Instala las dependencias del proyecto utilizando `npm install`.
4. **Configure AWS credentials:** Configura las credenciales de AWS utilizando los secretos definidos en el repositorio.
5. **Set up Docker Buildx:**  Configura Docker Buildx para construir imágenes multiplataforma.
6. **Cache Docker layers:** Almacena en caché las capas de Docker para acelerar las construcciones posteriores.
7. **Log in to Amazon ECR:** Inicia sesión en el repositorio de ECR.
8. **Construcción de la imagen:** `docker build -t ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ vars.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY_NAME }}:${{ github.sha }} .`  Esta línea construye una imagen Docker de tu aplicación y la etiqueta con el ID de tu cuenta de AWS, la región, el nombre del repositorio ECR y el hash del commit de GitHub.
9. **Push a ECR:** `docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ vars.AWS_REGION }}.amazonaws.com/${{ secrets.ECR_REPOSITORY_NAME }}:${{ github.sha }}` Esta línea sube la imagen Docker al repositorio ECR.
10. **Despliegue en ECS:** 

    ```
    aws ecs update-service \
      --cluster ${{ secrets.ECS_CLUSTER_NAME }} \
      --service ${{ secrets.ECS_SERVICE_NAME }} \
      --task-definition ${{ secrets.ECS_TASK_DEFINITION_ARN }} \
      --force-new-deployment
    ```

    Estos comandos actualizan el servicio ECS especificado para que utilice la nueva imagen Docker que se ha subido a ECR. `--force-new-deployment` fuerza al servicio a iniciar nuevas tareas con la nueva definición de tarea, incluso si no hay cambios en la definición.

## Acceso al Servidor

Una vez que el flujo de trabajo de GitHub Actions se complete con éxito, tu servidor web estará desplegado y disponible. 

Para acceder a él, necesitas la URL pública donde está accesible. 

* **Si configuraste un balanceador de carga:** La URL de acceso será la del balanceador. Puedes encontrarla en la consola de ECS, en la sección de tu servicio, o en la consola de EC2 si usaste un balanceador de carga clásico.
* **Si no usas balanceador de carga:**  Puedes acceder a través de la IP pública de la instancia EC2 donde se ejecuta tu servicio.  Ten en cuenta que esto requiere que tu instancia EC2 tenga una IP pública y que el puerto de tu aplicación esté abierto en el grupo de seguridad.

