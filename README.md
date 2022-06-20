# blogular
Angular blogging tool

## What is this software?

This is a blogging software made in Angular with which you can compile your own customized blog with minimal effort.

## How do I publish an article?

I am still working on a writer, more because of a safety reason than everything else. For the time being you can do like I do, directly tiping the HTML code in the "content" field of the article document.

## What if I don't want to use Mongo for it?

Don't worry, to make it compatible with a custom backend you just need to make sure it returns an object containing 

 - Title
 - Abstract
 - Content (plain HTML code)

when connecting to the backend with a /get/article/:id uri

and return an array of objects containing

  - Title
  - Abstract
  - ID
  
when connecting to the backend with a /get/articles uri

and return 404 whenever the :id entered in /get/article/:id is not pointing to an id on the database.

Default DB structure is

   - Title
   - Abstract
   - Content
   - ID

and it's advised to keep it like that if you don't want to modify the frontend software.

## Which dependencies does the backend require?

   - Express (npm i express)
   - CORS (npm i cors)
   - Mongoose (npm i mongoose)

## Which dependencies does the frontend require?

   - Axios (npm i axios)
   - @types/axios (npm i @types/axios)
   - @types/node (npm i --save-dev @types/node)
