FROM node:24-bookworm

# Native module build dependencies (bcrypt, better-sqlite3)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    git \
    # Playwright Chromium dependencies
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0 \
    libwayland-client0 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user matching typical devcontainer conventions
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# node user already exists in the base image; ensure correct UID/GID
RUN if [ "$(id -u $USERNAME)" != "$USER_UID" ]; then \
      groupmod --gid $USER_GID $USERNAME && \
      usermod --uid $USER_UID --gid $USER_GID $USERNAME; \
    fi

USER $USERNAME
