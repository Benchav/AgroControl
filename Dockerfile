# Usa una versión de Node estable y ligera
FROM node:22.13-alpine

WORKDIR /app

# Instalamos dependencias primero (aprovecha el caché de Docker)
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la app (Vite)
RUN npm run build

# Instalamos un servidor estático ligero para servir la carpeta 'dist'
RUN npm install -g serve

EXPOSE 7474

# Comando para arrancar la app
CMD ["serve", "-s", "dist", "-l", "7474"]
