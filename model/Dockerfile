# 1. Gunakan Python 3.13 sebagai base image
FROM python:3.13

# 2. Tentukan working directory di dalam container
WORKDIR /app

# 3. Salin requirements.txt ke dalam container
COPY requirements.txt ./

# 4. Install dependencies yang ada di requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 5. Salin seluruh file aplikasi dan model ke dalam container
COPY . .

# 6. Expose port 5000 untuk aplikasi Flask
EXPOSE 5000

# 7. Tentukan perintah untuk menjalankan aplikasi Flask menggunakan gunicorn (rekomendasi untuk production)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
