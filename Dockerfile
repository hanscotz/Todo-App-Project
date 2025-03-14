# use an official node.js runtime as parent image

FROM  node:23-alpine

#set the working directory in the container
WORKDIR /app

#copy the package.json and the package-lock.json files to the container
COPY package*.json .

#install dependency=ies
RUN npm install

#copy the rest of the application coe
COPY . .

#EXPOSE THE PORT THAT THE APP RUNS ON
EXPOSE 5000

#DEFINE THE COMMAND TO RUN APPLICATION
CMD ["node","./src/server.js"]
