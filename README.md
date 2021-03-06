# Rotten Potatoes

## Intro
This is CUHKSZ CSC3170 group project

## Group Members

* zsf
* zby
* sth
* ly
* wmj

## Demo

This project contains a demo which can be browsed within the CUHK(SZ) campus network

Open a browser and visit:

[**http://10.20.9.99:3000**](http://10.20.9.99:3000)

This site will be close after project grading is completed.

## How to Run

1. Install Packages

   1. python packages

	```bash
   pip install -r requirements.txt
	```

    2. node.js packages
	
	```
	npm install
	```

2. Set up your database

- Create database `rotten_potatoes`

* Create`.env` file:

```shell
PORT=3000
SECRET_KEY=RotTeNPOtATOeS
DB_RESET=true
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=passwd
DB_DATABASE=rotten_potatoes
```

substitute `DB_USER` field and `DB_PASSWORD` field with your own mysql user and password

3. Run nodejs server

* Run the server: `npm start`
* The server will be running at: "localhost:3000" (visit this url in your browser)
* Login the app with default user with name "root" and password "123"

## Frameworks
Technology stack used in this project:
* Frontend: [amis](https://aisuda.bce.baidu.com/amis/zh-CN/docs/index)
* Backend: [express](https://expressjs.com)

## Data
Data in this project is scraped from [IMDb Top 250 Movies](https://www.imdb.com/chart/top/) by crawler written by:
* [Requests](https://docs.python-requests.org/en/latest/)
* [BeautifulSoup4](https://beautiful-soup-4.readthedocs.io/en/latest/)

**if there is any infringement, please contact to delete**

## Functions
* login/register/personal center
* movie list and detail
* actor list and detail
* show actors of a movie under the movie's detail page
* show movies that an actor performed under the actor's detail page
* comment list
* show comments on a movie under the movie's detail page
* user detail page
* show comments that a user commented under the user's detail page
* release_date, average rate of movie and birth_date of actor
* collect data: finished with python crawler
* sort
    * movies: by release_date, average rate, name
    * actors: by birth_date (i.e. age), experience (number of movies acted)
* filter
    * movies: by movie_type, which decade (80s, 90s)
    * actors: by actor_type, which decade (80s, 90s)
* recommendation system


## Future Works
* character list page
* comment on actors
* like, dislike comment
* sort comments: by comment_date, like, dislike
* speed up crawler by async request
