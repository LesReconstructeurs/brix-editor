FROM node:16.20.2 as dev

USER root
WORKDIR /code

COPY package.json /code/
RUN npm cache verify
RUN npm install -g npm@8.19.4
RUN npm install 

COPY . /code/

CMD [ "npm", "run", "start" ]

# USER root
# WORKDIR /code
# COPY . .

# WORKDIR /code/api

# RUN npm cache verify
# RUN npm install -g npm@6.14.15
# RUN npm ci

# CMD [ "npm", "run", "start" ]

