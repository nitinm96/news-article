Articles Full Stack Application

Setup Instructions

1. Open the project in VS Code and open the terminal. Ensure you are in root path 'Minhas_Nitin_NewsApp'.
2. CD into 'backend' path in the terminal and run 'npm install' to install node modules for server side, once finished go back to root path.
3. CD into 'frontend' path in the terminal and run 'npm install'.
4. CD into 'news-app' path and run 'npm install' once finished go back into root path 'Minhas_Nitin_NewsApp'.
5. Ensure 3 node modules folders are present. In 'frontend/news-app', 'frontend', and 'backend' paths. Application will throw errors if not done correctly.
6. CD into 'backend' path and run 'npm run dev' in the terminal to start up the server. Once server is up and database is connected, open a new terminal by clicking the plus icon.
7. In the new terminal CD into 'frontend/news-app' path and run 'npm run dev' in the terminal. Once the application is running press 'o' in the terminal and hit enter if it does not launch automatically.

Testing Account:

- username:admin
- password:admin

Terminal Commands
cd: go into directory path
ls: display items in current directory

Express Terminal Commands:
rs: restart server
ctrl + c: terminate server

React + Vite Terminal Commands:
o: open application
r: restart application
ctrl + c: terminte application

Application Architecture
Frontend:
Application is a react+vite application with tailwind for styling and MUI for icons.

Backend:

- The server is using express and Node.js to manage user fetching, user creating, news fetching, article details, and favorite articles following MVC architeture.
- MongoDB is used for the implementation of a datastore to store user data including favorite articles and search history.
- For user authentication the application is using bycrpt to hash user passwords and jwt (jsonwebtoken) to provide a authorization token for user authentication.
- The thirdparty news API used is Mediastack to provide news and blog articles for various categories.
- All SECERT KEYS such database, JWT, API KEYS are store in .env and using dotenv dependency to use. The .env file is also in the gitignore.

API Documentation Avaliable at when backend server is running: http://localhost:5001/api-docs/

Versioning: Using github for version control and backup of code.

Link to Repo: https://github.com/nitinm96/news-article

Special Features:
To add and view favorite articles, the user must be logged in. The user can still view articles if they do not have an account however access will be restricted.

- If you don't want to create a account, you can use the testing account mentioned above to test the favoriting functionality otherwise feel free to create a new account.
