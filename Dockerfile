FROM node:16.13.1 AS builder

LABEL title="auth_renewal"
LABEL company="MAPSEA"
LABEL companyMail="support@mapsecorp.com"
LABEL author="hgkim"
LABEL devEmail="hgkim@mapsecorp.com"

ENV NODE_ENV=dev
WORKDIR /home/mapsea_dev/auth_renewal
COPY . .
RUN npm install
CMD npm run start:$NODE_ENV
# ENTRYPOINT [ "pm2-runtime start ecosystem.config.js --env " ,$ENV ]