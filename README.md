# IH Times

## Description

It's an app where you can search for articles

## MVP

-  **404:** Page Not Found
-  **SignUp:** Sign up to our platform to have access to our app 
-  **SigIn:** LogIn to see your profile page, our news page and news datails page 
-  **LogOut:** LogOut when you finnish your search / reading
-  **Delete Account:** When you no longer want to be a part of the app
-  **Profile page** Your page with personalized content (articles, books)
-  **List Content By Type** Articles separated by category
-  **Search Content** As a user I can add a restaurant so that I can share it with the community
-  **Add to read later** If you don't have the time to read it in the moment, save for later
-  **Delete to read later** If you already read it or no longer want to read it
-  **Create content** Add content to our collection
-  **About Us** To know more about the app and the developers

## Backlog

General:
- Animation for the loading state

404 page:
- Animation 

User profile:
- Follow other accounts
- Email verification
- Send emails to user

Content:
- Add comments to the content

Payments:
- Subscribe our app

Geo Location:
- Weather map with location of the user
- Events near the user location
  
# Client

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /main - content list
- /profile - user profile
- /profile/me - user profile
- /main/:category - content detail
- /main/create - content detail
- /main/:id/edit - content detail

- 404

## Pages

- Home Page (public)
- Sign in Page (public)
- Log in Page (public)
- Main content (private)
- Main content detail (private)
- Profile (private)
- Profile Add Content  (private)
- Profile Edit Content (private)
- Edit profile (private)
- 404 Page (public)

## Components

--- TO ADD LATER ---

## IO


## Services

--- TO ADD LATER ---


# Server

## Models

User model

```
username - String // required
firstName - String
lastName - String
email - String // required & unique
password - String // required
country - String
city - String
photo - Image
favorites - [ObjectID<Content>]
```

## API Endpoints/Backend Routes

--- TO ADD LATER ---
  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
