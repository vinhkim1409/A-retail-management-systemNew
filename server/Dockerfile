FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN chown -R node:node /home/node/app

USER node

RUN npm ci --omit=dev

COPY --chown=node:node . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "app.js"]