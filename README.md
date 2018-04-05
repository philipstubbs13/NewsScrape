# BasketballScraper
I finished this project about the time that the 2017-2018 NCAA Men's Basketball season came to end. Looking back at this season, a lot did happen that year. I would have to say that 2017-2018 was one of the more crazy, exciting, and interesting seasons that I can remember. I mean who can forget when Alabama nearly came back from an 11-point deficit with just over 10 minutes left while playing only three players against #14 Minnesota.

As a result of all that happened in the news, I decided to create an application that would scrape all the major news articles related to college basketball so that I (and other college basketball fans) could stay connected to the madness year round. More specifically, I used cheerio, MongoDB, Node.js, and various other technologies to scrape sports articles from http://www.espn.com/mens-college-basketball/, store them in a MongoDB database, and then add them to the application where fans can view them and leave comments.

## Table of contents
  * [Live](#live)
  * [About this project](#about-this-project)
  * [Getting started](#getting-started)
  * [Screenshots](#screenshots)
  * [Technologies used to create app](#technologies-used)
  	* [Backend technologies](#Backend)
  	* [Frontend technologies](#Frontend)
  * [Design improvements](#design-improvements)
  * [Issues](#Issues)

## <a name="live"></a>Live
Live: https://hoops-scraper.herokuapp.com/


## <a name="about-this-project"></a> About this project

* [How the app works](#how-app-works)
* [How the app is built](#how-the-app-is-built)
* [What is web scraping?](#about-web-scraping)
 
### <a name="how-app-works"></a> How the app works

### <a name="how-the-app-is-built"></a> How the app is built


### <a name="about-web-scraping"></a> What is web scraping?



## <a name="getting-started"></a> Getting started
The following section will take you through the steps of setting up this application and getting it running locally on your computer.

If you don't want to set up this project locally and just want to see the deployed application, go to  https://hoops-scraper.herokuapp.com/.

To set up this application locally on your computer, perform the following steps:
  1. [Clone the repository](#clone-repository)
  2. [Install Node.js](#install-node)
  3. [Install the dependencies](#dependencies)
  4. [Install Robo 3T](#install-robo)
  5. [Start the server](#start-server)

### <a name="clone-repository"></a> 1. Clone the repository
The first step is to clone the project repository to a local directory on your computer. To clone the repository, run the following commands:
<pre>
  git clone https://github.com/philipstubbs13/NewsScrape.git
  cd NewsScrape
</pre>

#### <a name="structure-of-project"></a> Structure of the project
<p>After you clone the repository, navigate to the project root directory (NewsScrape). The project directory structure is set up as follows:</p>
<ul>
  <li> 
    <p><b>server.js</b>: This file does the following:</p>
		<ul>
	    	<li>Defines and requires the dependencies, including express, body-parser, express-handlebars, mongojs,  morgan, mongoose, and request.</li>
	    	<li>Sets up the Express server.</li>
	    	<li>Sets up the Express server to handle data parsing using body-parser.</li>
	    	<li>Points the server to the API routes, which gives the server a map of how to respond when users visit or request data from various URLs.</li>
            <li>Defines the port the server is listening on.</li>
	    	<li>Starts the server.</li>
            <li>Allows the app to serve static content from the public directory.</li>
            <li>Uses Mongoose (orm) to connect to the mongo database, which allows us to have access to the MongoDB commands to perform CRUD (Create, Read, Update, and Delete) operations. </li>
    	</ul>
  <li>
    <p><b>public</b>: Contains the static content (images, Javascript, and CSS). </p>
    <ul>
      <li><b>assets/css/style.css</b>: External CSS stylesheet.</li>
      <li><b>assets/images</b>: Contains the background image used for this application.</li>
      <li><b>assets/app.js</b>: Contains the jQuery ajax POST, GET, PUT, and DELETE requests for adding comments to articles, getting the articles from the database, updating an article when a user saves one, and deleting articles/comments respectively. </li>
    </ul>
  </li>
  <li>
    <p><b>models</b>: Contains 3 files, which define the database schema or structure for this application.</p>
        <ul>
            <li><b>Headline.js</b></li>
            <li><b>index.js</b></li>
            <li><b>Note.js</b></li>
        </ul>
  </li>
  <li>
    <p><b>controllers</b>: Contains 3 files, which contain different routes (GET, POST, PUT, and DELETE). These routes are used to pass information to and from the view and model objects.</p>
        <ul>
            <li><b>fetch.js</b></li>
            <li><b>note.js</b></li>
            <li><b>headline.js</b></li>
        </ul>
  <li>
    <p><b>views</b>: Contains the Handlebars files, which are templates used to generate the html files.</p> 
  </li>
  <li><b>package.json</b>: Lists the project dependencies (third party npm packages) and their version numbers.</li>
  <li><b>.gitignore</b>: Anything listed inside this file (for example, node_modules) will not be tracked by GitHub when code is committed.</li>
  <li><b>package-lock.json</b>: Dependency tree for the project. Lists all the dependencies and their versions.</li>
</ul>

### <a name="install-node"></a> 2. Install Node.js
<p>If you don't already have Node.js installed on your computer, you can install the latest version here: https://nodejs.org/en/.</p>

### <a name="dependencies"></a> 3. Install the dependencies
<p>The following npm packages are dependencies to the project.</p>
<p>After you clone the repository to a local directory, change directory to the project root directory and run the following command to install the required npm packages:</p>
<pre>npm install</pre>
<ul>
	<li><b>express</b> -  a Node.js web application framework (https://www.npmjs.com/package/express).</li>
	<li><b>body-parser</b> - used to parse incoming request bodies in a middleware. (https://www.npmjs.com/package/body-parser)</li>
	<li><b>cheerio</b> - a web scraping tool used to grab information from another site.</li>
    <li><b>axios</b> - a promise based HTTP client for the browser and node.js (https://www.npmjs.com/package/axios)</li>
    <li><b>mongojs</b> - (https://www.npmjs.com/package/mongojs)</li>
    <li><b>mongoose</b> - (https://www.npmjs.com/package/mongoose)</li>
    <li><b>morgan</b> - (https://www.npmjs.com/package/morgan)</li>
    <li><b>express-handlebars</b> - allows you to use handlebars to create templates to build the HTML.</li>(https://www.npmjs.com/package/express-handlebars)</li>
    <li><b>request</b> - (https://www.npmjs.com/package/request)</li>
</ul>

<p>Version information for each of these packages is available in the <b>package.json</b> file in the project root directory.</p>

### <a name="install-robo"></a> 4. Install Robo 3T
<p>If you don't already have Robo 3T installed on your computer, you can install the latest version here: https://robomongo.org/download</p>
<p>For this project, Robo 3T is similar to MySQL Workbench (if you are used to working with MySQL databases). Robo 3T is a graphical user interface that is used to visually see the database and database collections (as opposed to using the command line interface for MongoDB).</p>


### <a name="start-server">5. Start the server</a>
<p>After performing all of the setup steps in the <b>Getting started</b> section, navigate to the project root directory (NewsScrape) and run the following command to start the server:</p>
<pre>
nodemon server.js
</pre>

<p>If you don't have nodemon installed on your computer, you can also start the server by running the following command. However, every time you make a change to the server, you will need to restart the server to view the change in the user interface.</p>

<pre>
node server.js
</pre>

<p>To verify that the server has started and the application is working locally on your computer, open Chrome and go to <a href="http://localhost:3000">http://localhost:3000</a>.</p>

## <a name="screenshots"></a> Screenshots

### Home page
<img src="readme_images/home.png">
<br>
<br>
<img src="readme_images/home2.png">

### Saved articles page
<img src="readme_images/saved_articles.png">
<br>
<br>
<img src="readme_images/saved_articles2.png">

### Leave a comment

## <a name="technologies-used"></a> Technologies used to build app
* [Backend technolgies](#Backend)
* [Frontend technologies](#Frontend)

### <a name ="Backend"></a> Backend technologies
* Node.js (https://nodejs.org/en/)
* MongoDB (https://www.mongodb.com/)
* Express (http://expressjs.com/)
* Mongoose ORM (http://mongoosejs.com/)
* Javascript


### <a name="Frontend"></a> Frontend technolgoies
* HTML
* CSS
* Bootstrap (http://getbootstrap.com/)
* Javascript
* jQuery (https://jquery.com/)
* Handlebars (http://handlebarsjs.com/)

## <a name="design-improvements"></a> Design improvements


## <a name ="Issues"></a> Issues
<p>If you find an issue while using the app or have a request, <a href="https://github.com/philipstubbs13/NewsScrape/issues/" target="_blank">log the issue or request here</a>. These issues will be addressed in a future code update.</p>