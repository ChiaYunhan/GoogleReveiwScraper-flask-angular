FROM node:20.18.0
WORKDIR /frontend
COPY package.json ./ 

RUN npm install -g @angular/cli && npm install
RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

# Expose port 4200
EXPOSE 4200


# Use --host to allow external access
CMD ["ng", "serve", "--host", "0.0.0.0"]
