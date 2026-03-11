# 🚀 DevSecOps Workshop

![DevSecOps](https://img.shields.io/badge/DevSecOps-Pipeline-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Minikube-green)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-orange)

## 📋 Project Overview

A complete DevSecOps pipeline implementation with Docker, Kubernetes (Minikube), and GitHub Actions, deploying a Node.js Express application.

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Ubuntu | 24.04 LTS | Operating System (WSL2) |
| Docker | 29.2.1 | Containerization |
| Kubernetes | v1.35.1 | Orchestration (Minikube) |
| Node.js | 18-alpine | Runtime Environment |
| Express | 4.18.2 | Web Framework |
| GitHub Actions | Latest | CI/CD Pipeline |

## 📁 Project Structure
devsecops-workshop/
├── 📂 app/
│ ├── 📄 Dockerfile # Container configuration
│ ├── 📄 index.js # Node.js application
│ └── 📄 package.json # Dependencies
├── 📂 k8s/
│ ├── 📄 deployment.yaml # Kubernetes deployment
│ └── 📄 service.yaml # Kubernetes service
├── 📂 .github/
│ └── 📂 workflows/
│ └── 📄 ci.yml # GitHub Actions pipeline
├── 📄 .gitignore # Git ignore rules
└── 📄 README.md # Project documentation


## 🚀 Application Features

- Simple Express.js web server
- Health check endpoint
- Containerized with Docker
- Orchestrated with Kubernetes
- CI/CD with GitHub Actions

## 💻 Local Development Setup

### Prerequisites
- Docker
- Minikube
- kubectl
- Node.js (for local testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rafay-484/Devsecops-Workshop.git
   cd Devsecops-Workshop

2. Build Docker image

bash
docker build -t devsecops-local:latest -f app/Dockerfile app/

3.Test locally

bash
docker run -d -p 3000:3000 --name test-app devsecops-local:latest
curl http://localhost:3000

4.Deploy to Kubernetes

bash
# Load image to Minikube
minikube image load devsecops-local:latest

# Apply Kubernetes manifests
kubectl apply -f k8s/

# Get application URL
minikube service devsecops-svc --url

🔄 CI/CD Pipeline
The GitHub Actions workflow automatically:

✅ Validates file structure

✅ Checks Dockerfile existence

✅ Verifies Kubernetes manifests

✅ Confirms package.json dependencies

📊 API Endpoints
Endpoint	Method	Description
/	 GET	Returns welcome message
/health	 GET	Health check endpoint

🧪 Testing
bash
# Test the deployed application
curl http://<service-url>:<port>
# Expected: "DevSecOps Workshop Working!"
