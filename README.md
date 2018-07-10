# Gif-API

GIF API uses JQuery AJAX to populate a web page dynamically without the need to refresh the page with data returned from a server. In this instance, we are populating the web page with images returned from the [Giphy api site](https://giphy.com). This application demonstrates the use of AJAX calls to APIs. API (Application Programming Interfaces) allow connectivity and exchange of data between systems housed in different organizations. We are able to access data and system functions programmatically. This is achieved through APIs resident in those systems that are exposed via a URL. Search parameters are provided through the URL as per the API specification and the API responds with the requested data.

Preset buttons have been created on the web page which can be clicked to retrieve images. When you click a retrieved image, it is animated.

A user is also able to dynamically add a button on the page by searching for a politician, fan or any subject that may have gifs on the Giphy api site. The user is able to save the giphy images to a favorite section. To save the images, I am using localstorage for persistence.


## Application access

The application can be accessed on [Heroku](https://serene-forest-57972.herokuapp.com) on the Portfolio link.