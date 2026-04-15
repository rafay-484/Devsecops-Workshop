# 🚀 DevSecOps CI/CD Workshop

![DevSecOps](https://img.shields.io/badge/DevSecOps-Pipeline-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Minikube-green)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-orange)
![Security Scans](https://img.shields.io/badge/Security-Trivy_&_npm_audit-red)

## 📋 Project Overview
A complete, resume-worthy DevSecOps pipeline implementation utilizing Docker, Kubernetes (Minikube), and GitHub Actions. This project has been upgraded to demonstrate "Shift-Left" security practices.

## 🛠️ Technology Stack
| Technology | Category | Purpose |
|------------|----------|---------|
| Node.js / Express | Application | Backend REST API & Dashboard |
| Helmet / CORS / Morgan | Security & Logging | Hardened Express App with secure headers |
| Jest & Supertest | Automated Testing | Unit tests running before deployments |
| GitHub Actions | CI/CD | Automated build, test, and container scanning |
| npm audit | SCA | Software Composition Analysis for Dependencies |
| Aqua Trivy | SAST/SCA | File-system and final Container image scanning |

## ✨ Upgraded Features
* **Modernized API Dashboard:** A styled frontend to test backend routes.
* **REST Endpoints:** `/api/health` and `/api/users` routes.
* **Security Scans in CI/CD:** Trivy prevents vulnerable images from being deployed.
* **Test automation:** Jest asserts API health/stability per code push.
