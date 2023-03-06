# Advanced Web Applications Project (Stackovercloned)

This project is essentially a stackoverflow clone done for learning purposes. 

## Installation:

### In the root folder run preinstall & install to install all node dependencies.
`npm run preinstall`
`npm run install`

### Create a .env file and set a secret key for use in jwt
`SECRET="YOUR_SECRET_KEY_HERE"`

### Optional:

### Set NODE_ENV to development (should be set to development by default):
Bash
`export NODE_ENV=production`

Windows PowerShell
`$env:NODE_ENV="production"`

Windows CMD
`set NODE_ENV=production`


## Running the website

In the root folder run (in development mode):
`npm run dev:server`
`npm run dev:client`

## User manual

### Overview:
All the users on the website are able to view existing posts and their respective comments. But in order to post or comment you must be registered user on the website.

### Registering:
Use the buttons on the header in the top right corner of the page. Clicking Register will take you to the registeration page. In the first field you are prompted to enter a display name that the other users will see on your posts and on your profile. Second is your email. And third is setting a password for your account, which must be atleast 8 characters long and requires atleast one upper- and lowercase letter and number. After registering your account will be created and authenticated and you're now ready to use the website.

### Login:
Use the buttons on the header in the top right corner of the page. Clicking Log In will take you to the login page. Enter the email and password you used when creating your account. After which the website will attempt to authenticate your account. If you entered the wrong information the authentication will fail. After a successfull login you're redirected to the front-page.

### Posting:
To create a new post click on the Ask Question button below the header on the right hand side of the website. In order to post you must've logged in. You will be taken to a page where you enter the title of your question and use the text editor to write your actual question, the text editor supports highlighting for code (currently only HTML) and other rich text editor features like **bold** and *italic*. After you have written your post click the Ask Question button to post your question. 

### Commenting:
To comment on existing posts click on the title of a post you wish to view. This will take you to the page of the post, on the bottom there is a text editor where you can write your comment, the text editor supports highlighting for code (currently only HTML) and other rich text editor features like **bold** and *italic*. In order to comment you must've logged in. After you have written your comment click the Post your answer button to post your comment.

### User profile:
You can view the user profile of user by click on their name on bottom right hand corner of their respective post. This will take you to their user page, which will show their name and how long they have been registered on the site. (Also lists their newest posts, but the formatting is currently broken).


## Technologies Used:

Name | Use
--- | ---
MongoDB | Database
Node.js | Runtime environment
Node.js, Express.js | Web framework 
React | Front-end framework


### Packages used

Name |  Why | End
--- | --- | ---
[Materialize UI] | for responsive design. It was chosen because I was already somewhat familiar with it due to course exercises, and there was ample documentation and examples on the internet. | Back-end
[Moment.js] | for datetime handling, very popular date library for parsing, formatting and etc. It was chosen because it’s a long lived project and it’s popular. | Back-end
[Slate] | for rich text editor, and displaying posts/comments. Chosen because it proved to be far easier to customize than e.g., [Draft.js] | Back-end
[Prism] | for code highlighting, popular and lightweight library for highlighting. Chosen because it was used for code highlighting in Slates examples, meaning it was relatively easy to tie into my own implementation. | Back-end
[React Router DOM] | for routing. Chosen because it was an already familiar library. | Back-end
[Bcrypt] | for password hashing. Chosen because it was an already familiar library. | Front-end 
[Mongoose] | as database object modelling tool. Chosen because it was already familiar. | Front-end 
[express-validator] | for validating user inputs. Chosen because it was already familiar. | Front-end 
[Passport] | for user authentication. Chosen because it was already familiar. | Front-end 
[Passport-jwt] | for user authentication. Chosen because it was already familiar. | Front-end 

[Materialize UI]: https://mui.com/
[Moment.js]: https://www.npmjs.com/package/moment?activeTab=readme
[Slate]: https://www.slatejs.org/examples/richtext
[Draft.js]: https://draftjs.org/
[Prism]: https://www.npmjs.com/package/prismjs
[React Router DOM]: https://www.npmjs.com/package/react-router-dom
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[Mongoose]: https://mongoosejs.com/
[express-validator]: https://express-validator.github.io/docs/
[Passport]: https://www.npmjs.com/package/passport
[Passport-jwt]: https://www.npmjs.com/package/passport-jwt


## Features

Feature | Points
--- | ---
Basics | -
Utilized React as a frontend framework | 5
Code highlighting (albeit only works on HTML for demo purposes, language detection proved to be difficult with technologies used) | 1-2
Pager is used for displaying posts | 2
User can click username for profile page (not implemented everywhere) | 1
Implemented dark and light modes (albeit the switch in the footer doesn’t work) | 1
Users page to display all users (pager not implemented) | 0-1
Rich text editor with built-in code highlighting (again only works with HTML, due to language detection) | 2-3