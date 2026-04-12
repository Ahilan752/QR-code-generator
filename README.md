#  QR Code Generator - DevOps Project

A full-stack QR Code Generator application built using React (frontend) and Node.js (backend), deployed using a complete CI/CD pipeline with Docker, Jenkins, and Kubernetes.

---

## 📌 Project Overview

This project demonstrates how a modern DevOps workflow is implemented in real-world applications.

The application allows users to generate QR codes dynamically by entering:
- URL links
- Plain text
- Contact information

The main goal of this project is not just building the application, but automating the deployment process using CI/CD tools.

---

## 🔁 CI/CD Pipeline Architecture

GitHub → Jenkins → Docker → Docker Hub → Kubernetes → User

### 🔹 Flow Explanation

1. Developer pushes code to GitHub  
2. GitHub triggers Jenkins using a webhook  
3. Jenkins pulls the latest code  
4. Jenkins builds Docker images for frontend and backend  
5. Jenkins pushes images to Docker Hub  
6. Jenkins deploys updated images to Kubernetes  
7. Kubernetes updates running pods automatically  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML, CSS
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- QR Code generation library

### DevOps Tools
- Docker (containerization)
- Jenkins (CI/CD automation)
- Kubernetes (container orchestration)
- Minikube (local Kubernetes cluster)
- GitHub (source code + webhook trigger)

---

## ⚙️ Features

- Generate QR codes instantly
- Supports multiple input types (URL, text, contact)
- Clean and responsive UI
- REST API architecture
- Fully containerized application
- Automated CI/CD pipeline
- Kubernetes-based deployment




