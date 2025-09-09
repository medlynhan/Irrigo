# 🌱 Irrigo - Irrigation Recommendation System

A web application that helps Indonesian farmers by predicting **rice crop water requirements** for the next 5 days, based on soil moisture and weather forecasts.  
The goal is simple: provide **accurate irrigation recommendations** so farmers know **how much water their land needs** to optimize crop growth.  

## 👩‍💻 Project Background

This project was developed as part of **SECOMP 2025 🏆**, a technology competition organized by **Universitas Udayana**.  
The focus is to empower farmers with **data-driven irrigation planning**, reducing water waste and improving rice field productivity.  

By combining **AI predictions** with real-time weather and soil data, this project demonstrates how technology can support sustainable agriculture in Indonesia.  

## 🚀 Features
- 📍 **Land coordinates input** → Farmers can enter the coordinates of their rice fields.  
- 🌤️ **Weather forecast** → Powered by **OpenWeatherAPI**.  
- 🌱 **Soil moisture data** → Retrieved from **EOSDA API**.  
- 🤖 **Crop water requirement prediction** → Using a **Random Forest model**.  
- 📊 **5-day prediction results** → Helps farmers manage irrigation planning.  

  
## 🧠 AI Model

- **Algorithm**: Random Forest  
- **Dataset**: [Crop Water Requirement (Kaggle)](https://www.kaggle.com/datasets/prateekkkumar/crop-water-requirement)  
- **Purpose**: Predict rice water needs based on weather conditions & soil moisture.  


## 🏗️ Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/)  
- **Backend**: [Node.js](https://nodejs.org/)  
- **AI Model API**: [Flask](https://flask.palletsprojects.com/)  
- **External APIs**:  
  - [OpenWeatherAPI](https://openweathermap.org/api) → weather forecast  
  - [EOSDA API](https://eos.com/) → soil moisture data  
- **Containerization**: [Docker](https://www.docker.com/) + Docker Compose  


## 🐳 Running Locally

To run this project locally, make sure you have **Docker** installed. Then follow these steps:

```bash
# Clone the repository
git clone https://github.com/username/grow.git
cd grow

# Start the application
docker-compose up --build
