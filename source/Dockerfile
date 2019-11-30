#####-BUILD--------------------------------------------------------------------------------------------------------------------------------
FROM node AS build

##-----Install Chrome to run tests---------------------------------------------------------------------------------------------------------
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

WORKDIR /app

##-----Copy Angular Project to be Built----------------------------------------------------------------------------------------------------
COPY frontend/software-engineering /app/

##-----Install Angular Build tools---------------------------------------------------------------------------------------------------------
RUN npm install && \
    npm rebuild && \
    npm install -g @angular/cli

##-----Run Angular Tests-------------------------------------------------------------------------------------------------------------------
# RUN npm run test:ci
# RUN npm e2e

##-----Build Angular Project for Production------------------------------------------------------------------------------------------------
RUN npm run build:prod


#####-PRODUCTION---------------------------------------------------------------------------------------------------------------------------
FROM python

##-----Copy backend Python project and Angular project from build image--------------------------------------------------------------------
COPY backend /app/backend
COPY --from=build /app/dist /app/backend/templates/html

##-----Install Python application requirements
RUN pip3 install Flask && \
    pip3 install -U flask-cors && \
    pip3 install SQLAlchemy && \
    pip3 install pprint

WORKDIR /app/backend

##-----Expose Port to External Network-----------------------------------------------------------------------------------------------------
EXPOSE 80

##-----Start Python Application------------------------------------------------------------------------------------------------------------
ENTRYPOINT python __init__.py
