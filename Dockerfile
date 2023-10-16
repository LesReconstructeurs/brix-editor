FROM node:14.17.6 as dev

USER root
WORKDIR /code
COPY . .

WORKDIR /code/api

RUN npm cache verify
RUN npm install -g npm@8.19.4
RUN npm ci
CMD [ "npm", "run", "start" ]

# RUN npm run db:create
# RUN npm run db:seed
# # pour tous : migration
# RUN npm run db:migrate

WORKDIR /code/pix-editor

RUN npm cache verify
RUN npm install -g npm@6.14.15
RUN npm ci
RUN npm install -g ember-cli 

CMD [ "npm", "run", "start" ]

FROM dev as builder
ENV BUILD_ENV=dev

RUN npx ember build --env $BUILD_ENV

FROM nginx:1.21.6 as production

COPY --from=builder /code/pix-editor/dist/ /usr/share/nginx/html/
