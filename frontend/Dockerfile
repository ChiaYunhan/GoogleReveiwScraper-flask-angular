FROM node:20.18.0
WORKDIR /frontend
COPY package.json ./ 

# Combine commands to reduce layers
RUN npm install -g @angular/cli && npm install

# Expose port 4200
EXPOSE 4200


# Use --host to allow external access
CMD ["ng", "serve", "--host", "0.0.0.0"]
