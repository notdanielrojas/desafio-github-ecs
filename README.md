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
2. **Construcción de la imagen:**  `docker build -t ${{ secrets.ECR_REPOSITORY }}:${{ github.sha }} .`  Esta línea construye una imagen Docker de tu aplicación y la etiqueta con el nombre del repositorio ECR y el hash del commit de GitHub.
3. **Push a ECR:** `docker push ${{ secrets.ECR_REPOSITORY }}:${{ github.sha }}`  Esta línea sube la imagen Docker al repositorio ECR.
4. **Despliegue en ECS:** Se utiliza `ecs-deploy` para actualizar el servicio ECS:

    ```
    ecs-deploy \
      --cluster ${{ secrets.ECS_CLUSTER }} \
      --service-name ${{ secrets.ECS_SERVICE_NAME }} \
      --image ${{ secrets.ECR_REPOSITORY }}:${{ github.sha }}
    ``` 

    Estos comandos actualizan el servicio ECS especificado para que utilice la nueva imagen Docker que se ha subido a ECR.

## Acceso al Servidor

Una vez que el flujo de trabajo de GitHub Actions se complete con éxito, tu servidor web estará desplegado y disponible. 

Para acceder a él, necesitas la URL pública donde está accesible. 

* **Si configuraste un balanceador de carga:** La URL de acceso será la del balanceador. Puedes encontrarla en la consola de ECS, en la sección de tu servicio, o en la consola de EC2 si usaste un balanceador de carga clásico.
* **Si no usas balanceador de carga:**  Puedes acceder a través de la IP pública de la instancia EC2 donde se ejecuta tu servicio.  Ten en cuenta que esto requiere que tu instancia EC2 tenga una IP pública y que el puerto de tu aplicación esté abierto en el grupo de seguridad.


## Pasos con Docker

Para que este flujo de trabajo funcione correctamente, necesitas tener un `Dockerfile` en la raíz de tu proyecto. Este archivo contiene las instrucciones para construir la imagen Docker de tu aplicación. 

## Consideraciones Adicionales

* **Variables de entorno:** Si tu aplicación necesita variables de entorno, configúralas en la definición de tarea de ECS.
* **Escalabilidad:** ECS permite escalar tu aplicación automáticamente. Puedes configurar reglas de escalado automático en tu servicio ECS.
* **Monitorización:** Utiliza CloudWatch para monitorizar las métricas de tu aplicación y recibir alertas si hay problemas.

## Recuerda

* Este es un ejemplo básico. Puedes personalizar el flujo de trabajo según tus necesidades.
* Sigue las mejores prácticas de seguridad al configurar tus recursos de AWS y los secretos de GitHub Actions.
* Revisa la documentación de las acciones de GitHub Actions para obtener más información.
