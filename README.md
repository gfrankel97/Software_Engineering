# Software Engineering Stack

## Infrastructure
* Using Microsoft Azure for hosting
* Haven't found a way to share access to the team
* Terraform was chosen for infrastructure as code for simplicity and familiarity
    * Infrastructure as code gives us disaster recovery, in the case that our infrastructure gets wiped out.
    * This also detects drift, or configuration changes made to the infrastructure outside of Terraform

## CI/CD (Continuous Integration / Continuous Deployment)
* Using [Travis CI](https://travis-ci.com/) to build and deploy our code.
* Access to GitHub repo should provide access to Travis CI.
* Committing to master SHOULD kick off a build that tests the code, and deploys the changes. Since we're using a free account with Travis CI, we only get 100 builds, so I set it to only build and release when it's kicked off manually. If we run out, we can always set up a different account and get another 100 builds.
* All related code is in `.travis.yml` file in the root of the repository

## Docker
* Our Docker [repo](https://cloud.docker.com/u/gfrankel/repository/docker/gfrankel/cecs550-software-engineering)
* [Docker Documentation](https://docs.docker.com/)
* Used to build applications into lightweight, portable, scalable, production-ready containers
* Angular is built and unit tests are run during the Docker build process
* Docker serves as the Python runtime
* `source/Dockerfile` is the only Docker related file.
    #### Using Docker for local development (not recommended due to build time)
    ```bash
    #From directory that contains the Dockerfile
    docker build -t <IMAGE_TAG> .
    docker run -it -p <PORT_TO_RUN_APP_ON>:80 <IMAGE_TAG>
    ```
    This will rebuild the application, run tests, and serve the application on `localhost:<PORT_TO_RUN_APP_ON>`


## Backend
* Python with Flask backend
* Serves UI and the API
* Served on port 80
* `source/backend` is the file path to the backend code.
* [Jinja2](https://jinja.palletsprojects.com/en/2.10.x/) is the templating language used by Python to serve HTML.

## Frontend
* Using Angular
* [Angular Docs](https://angular.io/docs)
* `source/frontend` is the file path to the frontend code.


