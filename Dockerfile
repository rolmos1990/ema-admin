FROM node:18-alpine3.16
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]