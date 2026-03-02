# ⚖️ LexAI - AI Legal Assistant

LexAI is an AI-powered legal assistant web application built for Indian law. It provides instant legal guidance, document analysis, case management, and lawyer discovery — all in one platform.

## 🚀 Features

- 🤖 **AI Legal Chatbot** — Powered by Google Gemini, answers Indian law questions instantly
- 👨‍⚖️ **Find Lawyers** — Search lawyers by specialty and city
- 📋 **Case Management** — Create, track, and manage legal cases
- 📄 **Document Analyzer** — AI-powered legal document analysis
- 🔐 **Role-based Access** — Separate dashboards for Users, Lawyers, and Admins

## 🛠️ Tech Stack

### Frontend
- React.js
- Framer Motion
- React Router

### Backend
- Java Spring Boot
- Spring Security
- Spring Data JPA
- MySQL

### AI
- Google Gemini 2.0 Flash API

## ⚙️ Setup Instructions

### Prerequisites
- Java 21
- Node.js
- MySQL
- Google Gemini API Key

### Backend Setup
1. Clone the repository
```
   git clone https://github.com/hameersk1603/lexai.git
```
2. Create MySQL database
```sql
   CREATE DATABASE lexai_db;
```
3. Create `application.properties` in `backend/src/main/resources/`:
```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/lexai_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   server.port=8080
   spring.jpa.open-in-view=false
   gemini.api.key=YOUR_GEMINI_API_KEY
```
4. Run the backend
```
   cd backend
   mvnw spring-boot:run
```

### Frontend Setup
1. Install dependencies
```
   cd frontend
   npm install
```
2. Start the app
```
   npm start
```
3. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
lexai/
├── backend/
│   └── src/main/java/com/hameer/lexai/
│       ├── controller/
│       ├── service/
│       ├── model/
│       ├── repository/
│       └── enums/
└── frontend/
    └── src/
        ├── pages/
        ├── context/
        ├── services/
        └── styles/
```

## 🔑 Getting a Gemini API Key
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Get API Key"
3. Click "Create API key in new project"
4. Copy and paste into `application.properties`

## ⚠️ Important
- Never commit `application.properties` to Git
- Never hardcode API keys in frontend code
- `application.properties` is already added to `.gitignore`

## 👨‍💻 Developer
Made by **Hameer** — [GitHub](https://github.com/hameersk1603)
```

---

Just copy this, create a `README.md` file in your project root and paste it. Then:
```
git add README.md
git commit -m "add README"
git push
