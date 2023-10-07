FROM node:14.17.6 as dev


EXPOSE 4300
RUN npm install -g npm@8.13.2

USER node
COPY --chown=node:node . /code 

WORKDIR /code
RUN npm ci

CMD [ "npm", "run", "start" ]
