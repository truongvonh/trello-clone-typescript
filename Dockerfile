FROM node:12.13-alpine as build-stage
WORKDIR /usr/src/app-trello
COPY . .

RUN yarn

RUN yarn build

FROM node:12.13-alpine as production-stage
WORKDIR /usr/src/app-trello

COPY --from=build-stage /usr/src/app-trello/ecosystem.config.js .
COPY --from=build-stage /usr/src/app-trello/build ./build

RUN pwd
RUN yarn global add pm2
RUN yarn global add serve

RUN ls -l

CMD ["serve", "-s", "build"]
#CMD ["pm2", "restart", "ecosystem.config.js"]