# Dress-Store

 Created by Vince Chang

 ### Tech Stack:
 - BackboneJS
 - Handlebars
 - HTML5/CSS3
 - JavaScript
 - Jquery
 - Bootstrap

### Dress Store Iteration 1
This iteration was my first attempt at creating the Dress-Store. The user only
has one dress to choose from. After the user selects through the dress options
and clicks on the next button, the shipping form is shown. The user will click
on the finish button and a summary of what they purchased will appear on the
screen.

![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I1_P1.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I1_P2.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I1_P3.png)

## Biggest Challenges
1. Figuring out how to pull the data from a form and organizing it in a way that
was easy for me to display the data onto the web page

### Dress Store Iteration 2
This iteration I decided to add another item to my Backbone collection. I also
split each section in the chain of events to its own corresponding view with
a MainView that communicates to all other views (ProductView, ShippingView, and
CheckoutView). The main reason why I decided to split this up was because I
needed a more sophisticated and organized way to split up the code instead of
having all my code rendered in one view. It will be easier to edit/remove view
components instead of finding exactly where the code is located.

## Updates
- Once the next button is selected, the ProductView section is now hidden for
better user flow
- The last CheckoutView module no longer shows the picture and description of
what they ordered, just shows the size, color, quantity and name of item

![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P1.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P2.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P3.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P4.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P5.png)
![](https://github.com/vincehacks/Dress-Store/blob/master/screenshots/I2_P6.png)

## Biggest Challenges
1. It was difficult now with another item in the mix. My biggest hurdle was how
to reuse my same logic to iterate through the collection to gather the user
selection requirements.
2. Understanding how Backbone's Channel works and the logic of how it is used to
have listeners and trigger events that are called in different views

## What's Next
- Found that Marionette (built on top of Backbone) can help solve my complex
problem of Views speaking/gathering data from other views, will attempt to use
Marionette to compare and contrast the difference
