# **ExpressJS & Github Api Example**

## **why use databases instead of files?**

### **Overview**

simple express api about how to run a api that is connected to github user api, without token, the purpose of this project is show the difference between databases and files, when you use a file instead a database you can look the low performance doing this operation.

Another purpose to this project is make more easy use the github api without pay a price, without tokens, only using your github api repos url, like this:

> https://api.github.com/users/<GITHUB_USERNAME>/repos

> [!CAUTION]
> dont deploy this in a serious project

> [!IMPORTANT]
> where there is it <>, replace it with your custom properties or names

### __Running it in Local Environment__

install dependencies
```
npm install
```

create your own .env file with the following structure

```javascript
GITHUB_REPOS_URL="https://api.github.com/users/<GITHUB_USERNAME>/repos"
DATA_FILE_PATH="/data.json"
API_ROOT_URL="/api/v1"
```

execute it in development mode
```
npm run dev
```

got to your browser at http://localhost:3000.


or compile it and run it with the following command:
```
npm start
```


### __Running from a docker image__

* 1.downloading the official image from docker hub:

```
docker pull johanpuentesdev/github-api
```
run the container with the following command:

```
docker run -it --rm -d -p 8000:3000 --env GITHUB_REPOS_URL=https://api.github.com/users/<GITHUB_USERNAME>/repos --env DATA_FILE_PATH=/data.json --env API_ROOT_URL=/api/v1 --name api-github johanpuentesdev/github-api
```

got to your browser at http://localhost:8000.

* 2.build the image from the source code.

clone this repository with the following command:

```
git clone https://github.com/bitsbyseb/api-github.git
```

go to the project directory:
```
cd api-github
```

run the docker image builder:

```
docker build -t <CUSTOM_IMAGE_NAME> .
```

run the container:

```
docker run -it --rm -d -p 8000:3000 --env GITHUB_REPOS_URL=https://api.github.com/users/<GITHUB_USERNAME>/repos --env DATA_FILE_PATH=/data.json --env API_ROOT_URL=/api/v1 --name api-github <IMAGE_CUSTOM_NAME>
```

got to your browser at http://localhost:8000.
