# Gunakan image Node.js dasar
FROM node:18-alpine

# Atur direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Ekspor port yang digunakan aplikasi (ganti 3000 jika perlu)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "index.js"] # Ganti index.js dengan nama file utama aplikasi Anda