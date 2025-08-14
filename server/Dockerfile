# 1. Gunakan image Node.js v22.12.0 sebagai base image
FROM node:22

# 2. Tentukan direktori kerja di dalam container (sesuaikan dengan struktur folder)
WORKDIR /app

# 3. Salin package.json dan package-lock.json untuk menginstall dependensi
COPY package*.json ./

# 4. Install dependensi Node.js
RUN npm install

# 5. Salin seluruh file aplikasi ke dalam container
COPY . .

# 6. Expose port 8000 untuk aplikasi Node.js
EXPOSE 8000

# 7. Tentukan perintah untuk menjalankan server Node.js
CMD ["node", "app.js"]
