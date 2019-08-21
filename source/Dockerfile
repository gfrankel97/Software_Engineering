FROM python


COPY backend /app/backend
COPY frontend/software-engineering/dist/software-engineering /app/backend/templates/html

RUN pip3 install Flask
RUN pip3 install -U flask-cors

WORKDIR /app/backend

ENTRYPOINT python __init__.py