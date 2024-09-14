# React, TypeScript, and MUI boilerplate

## Features

The following frameworks/libraries have been implemented:

1. [React](https://reactjs.org/)
2. [TypeScript](https://www.typescriptlang.org/)
3. [MUI](https://mui.com/)
4. [React Router](https://reactrouter.com/)
5. [Prettier](https://prettier.io)
6. [ESLint](https://eslint.org/)

## Local environment setup

### Prerequisites

1. Docker Desktop (https://docs.docker.com/desktop/) - can be used on Windows,
   Mac, Linux, for users with docker installed, make sure to update docker to
   latest stable
2. Docker Compose v2.22 or higher - should be installed with Docker Desktop, if
   you are using a different setup(ex: linux docker instance) docker compose
   should be updated to 2.22 or higher
3. Git(https://git-scm.com/downloads) - if using windows, git should be added to
   the PATH environment variable and accessible in CMD

### Starting local environment

1. Ensure that proper .env file is in place in the project root folder

````
HOST=0.0.0.0
PORT=3000
````

The port for the WebUI should be 3000

2. Open CMD

````
cd <path-to-repo>
docker compose watch
````

This will create a new container with synchronization for the project files,
except node_modules Any changes to the files in the repository will sync with
the container and trigger Hot Reload from Webpack Any changes to package.json
will rebuild the current image automatically and the container will be restarted

3. Access the frontend project The project should be accessible at:

````
http://localhost:3000
````

# Install **DEPRECATED**

### Host file

````
0.0.0.0 		localhost.arcana
127.0.0.1 		localhost.arcana
::1				localhost.arcana
````

Setup IDE cmd to use Git Bash !!!

To get up and running with the template, you just have to run the _git_ commands
below:

```
yarn
```

```
yarn start
```

### Tips for when yarn is not installing.

- Node v16
- yarn cache clean --all
- yarn install

## Versions

- 1.00 - MVP

## Author

- [Arcana](https://arcana.com)

