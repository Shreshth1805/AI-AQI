# 🌍 AirGuard: Smart AQI Monitoring

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![ML](https://img.shields.io/badge/ML-Scikit--Learn%20%26%20XGBoost-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)

> **Predict, visualize, and plan for cleaner air in smart cities using AI for Earth principles.**

---

## 📖 Overview

**AIRGUARD** is a full-stack application designed to tackle urban air pollution. By integrating smart city sensor data (PM2.5, PM10, NO₂, CO, O₃) with advanced machine learning, the system provides accurate **Air Quality Index (AQI)** predictions. 

This project empowers policymakers and citizens with **early warning mechanisms** and interactive data visualization to foster healthier urban environments.



---

## 🤖 Machine Learning Architecture

The core of AIRGUARD lies in its ensemble of regression models. We evaluated and implemented multiple supervised learning algorithms to ensure the highest predictive accuracy:

* **XGBoost (Extreme Gradient Boosting):** For high-performance gradient boosted decision trees.
* **Gradient Boosting Regressor:** To optimize prediction through additive modeling.
* **AdaBoost Regressor:** For boosting the performance of weak learners.
* **Random Forest:** An ensemble approach to reduce overfitting and improve stability.
* **Decision Tree:** To establish a clear, interpretable baseline for data splits.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, Recharts |
| **Backend** | FastAPI (Python), Uvicorn |
| **ML Libraries** | XGBoost, Scikit-Learn, Pandas, NumPy |
| **Environment** | Microsoft AI for Earth Principles |

---

## 📂 Project Structure

```text
AI-AQI/
├── backend/         # FastAPI & ML Models
│   ├── app.py          # API Endpoints
│   ├── models/         # Trained .pkl or .joblib files
│   └── requirements.txt
├── frontend/        # React + Vite
│   ├── src/            # UI Components & Dashboard
│   └── package.json
└── README.md

```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/AI-AQI.git](https://github.com/your-username/AI-AQI.git)
cd AI-AQI

```

### 2. Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

```

> 💡 **Tip:** View the interactive API documentation at `http://127.0.0.1:8000/docs`

### 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
npm run dev

```

> 💻 Dashboard available at: `http://localhost:8080`

---

## 📌 Key Features

* 🔹 **Multi-Model Inference:** Real-time AQI prediction using XGBoost and Ensemble methods.
* 🔹 **Dynamic Dashboard:** Visual representation of pollutants (PM2.5, NO₂, etc.) using interactive charts.
* 🔹 **Early Warning System:** Automated alerts for hazardous air quality levels.
* 🔹 **Scalable API:** Modular FastAPI backend ready for integration with IoT sensors.

---

## 🙌 Contributors

A huge thanks to the team behind AirGuard.

| Contributor | GitHub Profile |
| --- | --- |
| **Shreshth Verma** | [👤 @Shreshth1805](https://github.com/Shreshth1805) |
| **Diksha Mahajan** | [👤 @diksha-mahajan](https://github.com/diksha13555) |
| **Pridhi Thareja** | [👤 @Pridhi-24](https://github.com/Pridhi-24) |
| **Nipun Mahajan** | [👤 @nipunmah](https://github.com/nipunmah) |
| **Ishwinder Kaur** | [👤 @IshwinderKaur8](https://github.com/IshwinderKaur8) |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```
