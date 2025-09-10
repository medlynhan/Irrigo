# Gunakan image Node.js versi 22
FROM node:22

# Tentukan direktori kerja dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin file .env.local untuk variabel lingkungan
COPY .env.local .env.local

# Salin seluruh file frontend ke container
COPY . .

# Build aplikasi frontend (misalnya dengan `npm run build`)
RUN npm run build

# Jalankan aplikasi frontend (misalnya di port 3000)
CMD ["npm", "run", "dev"]

# Expose port untuk frontend
EXPOSE 3000
