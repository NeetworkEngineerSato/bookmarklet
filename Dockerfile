FROM node:17-slim
WORKDIR /app

# プロジェクトフォルダのマウントでnode_modulesが消えるのを防ぐ
VOLUME /app/node_modules

COPY package.json package-lock.json /app/
RUN apt-get update && \
    apt-get install -y git && \
    npm install
