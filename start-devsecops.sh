#!/bin/bash
set -e

echo "Starting DevSecOps Workshop..."

# Move to project root (directory containing this script)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Start Docker daemon if needed (WSL/non-systemd friendly)
if ! docker info >/dev/null 2>&1; then
    echo "Docker daemon is not running. Attempting to start Docker..."

    if command -v systemctl >/dev/null 2>&1 && [ "$(ps -p 1 -o comm=)" = "systemd" ]; then
        sudo systemctl start docker
    else
        sudo service docker start
    fi
fi

# Verify Docker is now running
if ! docker info >/dev/null 2>&1; then
    echo "Error: Docker daemon is still not reachable."
    echo "Start Docker Desktop (if using WSL) or start docker service manually, then retry."
    exit 1
fi

# Start Minikube if not running
if ! minikube status 2>/dev/null | grep -q "host: Running"; then
    echo "Starting Minikube..."
    minikube start --driver=docker
else
    echo "Minikube already running"
fi

# Ensure deployment is running
echo "Checking Kubernetes deployment..."
if ! kubectl get pods 2>/dev/null | grep -q "devsecops-app"; then
    kubectl apply -f k8s/
fi

echo ""
echo "Current pod status:"
kubectl get pods
echo ""

echo "Starting port-forward (Ctrl+C to stop)..."
echo "Access URL: http://localhost:3000"
kubectl port-forward service/devsecops-svc 3000:3000
