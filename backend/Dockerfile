FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends php-cli default-jdk && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN javac Compute.java
ENV PORT=8080
EXPOSE 8080
CMD ["python","server.py"]
