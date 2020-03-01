# Description
* Visit at [https://www.crestedmyna.com/](https://www.crestedmyna.com)
* Express Backend running at AWS Lambda using `serverless-http`
* Frontend is built on [React](https://reactjs.org/) using [antd](http://ant.design/)
* Frontend is hosted a netlify


## Deployment procedure
```
git checkout develop
git pull
git checkout master
git rebase develop
git push -f               # push to master will trigger rebuild at netlify 
cd backend 
serverless deploy         # dpeloy to lambda
```
