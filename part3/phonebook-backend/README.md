# Course Informationen
This is the implemented React App for [Part 3](https://fullstackopen.com/en/part3) (phonebook-backend) in the [FullStack Open 2020 Course](http://fullstackopen.com). Please check the Commit History for all Exercise steps.

## Dependencies
* expressjs
* cors
* morgan
* nodemon (for development purposes)

## How to run
I have added a npm command called `build:ui` in order to build and copy the `build` from part 2 here. The Frontend needs to be 2 folders above this folder in order to run it (or just copy from `build` in part 2). In order to execute it, just run `npm run build:ui` and then `npm start`.

For Exercise 3.10, based on [this post](https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f) on Medium, I had to deploy using a git subtree pointing to the backend directory. Please see the `package.json` in phonebook-backend for further information (`deploy` and `deploy:full` for Part3 3.11).
You can find the backend on http://floating-hollows-23285.herokuapp.com/

My steps how I did it (in the root of the git repository):

    heroku create
    git subtree push --prefix part3/phonebook-backend heroku master

Then you should be able to access it.

### Update
For Exercise 3.21, I updated the web app in heroku. You can still find the backend on http://floating-hollows-23285.herokuapp.com/
For this application I used a `.env` to store the `MONGODB_URI` and the `PORT` environment variable and used, as described in
'Validation and ESLint' in Part 3, `heroku config:set MONGODB_URI='<MONGODB_URI>'` to set the environment variable
