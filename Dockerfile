FROM node:14.17.6 as dev

USER root
EXPOSE 3000
RUN npm cache verify
RUN npm install -g npm@6.14.15

USER node
COPY --chown=node:node . /code 

WORKDIR /code
RUN npm ci

CMD [ "npm", "run", "start" ]
