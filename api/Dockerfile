FROM node:16.20.2 as dev

USER root

RUN ["mkdir", "/install"]

ADD ["./package.json", "/install"]
WORKDIR /install
RUN npm cache verify
RUN npm install -g npm@8.19.4
RUN npm install --verbose
ENV NODE_PATH=/install/node_modules


WORKDIR /code
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

