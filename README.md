# SoccerScraper

This is an app that uses Cheerio to let users scrape (retrieve) articles from the soccer section of the New York Times website.  Selected articles and any associated user notes are stored in and retrieved from MongoDB.

## Technologies Used

* MongoDB 
* Mongoose
* Cheerio
* Axios
* Javascript
* Morgan (for logging)
* Bootstrap 

## Getting Started

Check out the deployed version here - https://fast-fjord-71527.herokuapp.com/ 

-or-

If you'd like to run this app locally... (Note: You will need MongoDB)

**Step 1 - Clone this repo using the command line below.**
```
git clone https://github.com/klbjklbj/soccerscraper.git
```
**Step 2 - Change your local directory to the cloned repo folder.**
```
cd soccerscraper
```
**Step 3 - Install all required NPM packages.**
```
npm install
```
**Step 4 - Start MongoDB on your machine**
```

```
**Step 5 - Start the application server using the command line below**
```
node server.js
```
## How It Works

On the Home Page, users click on the "Scrape Articles" button. This will display a max of 20 soccer articles from the New York Times.

<div align="center">
<img src="https://github.com/klbjklbj/soccerscraper/blob/master/public/images/scraped.png"></img>
</div>
<br><br>

Users can click the saved button after any scraped article to save it. These saved articles can be viewed using the "View Saved" button. When viewing the saved articles there is a button for Deleting the article from the saved list (but not from the database). There is another button for adding notes to the saved article.

<div align="center">
<img src="https://github.com/klbjklbj/soccerscraper/blob/master/public/images/saved.png"></img>
</div>

<div align="center">
<img src="https://github.com/klbjklbj/soccerscraper/blob/master/public/images/notes.png"></img>
</div>

<br><br><br>
Happy Reading!
