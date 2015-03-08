#Jason Fan - COMP 20 Spring 2015 - Lab 6: Messages

###What has been implemented properly:
* All required aspects have been implemented properly, only ```lab.js``` and ```style.css``` has been changed

###Collaboration and Discussion
* I discussed the assignment with my most lovely, and ~~fabulous~~ ~~awesome~~ ~~fantastic~~ great roommate Norman Young

###Time spent:
* approx 1 hr

###Acknowledgments:
Thanks to Prof. Ming Chow for making his examples for DOM lecture available, I used the style-sheet from his #FML example to format the messages

###Questions regarding Same Origin Policy:
#####Is it possible to request the data from a different origin (e.g., [`http://messagehub.herokuapp.com/`](ttp://messagehub.herokuapp.com/)) or from your local machine (from `file:///`) from using XMLHttpRequest?

No.

#####Why not?

This is because of a policy called the Same Origin Policy that prevents the exchange of information from one website to another enforced by modern Browsers.

#####What are the details of the Same Origin Policy?

The Same Origin Policy only allows scripts to interact with a resource from the same origin. two resources/pages have the same origin if and only if the following three things are the same: the protocol (e.g. HTTP, HTTPS), the same port, and the same host.

#####Why is this important?

Same Origin Policy is a security measure that prevents malicious websites to access information from another origin. You would not want any random website to request and get data from your on-line banking site now would you? Without the same origin policy malicious websites could use JavaScript to post and retrieve data from other hosts and domains. It is also important that browsers allow scripts to change the elements on pages that are trusted. This is why Same Origin Policy is so important. It is so that a website can use JaveScript to change DOM objects on their OWN origin/site and no other. Thus allowing JavaScript to be a powerful tool in building websites and at the same time ensuring that scripts do not have the power to change or retrieve information on other websites.

######Sources
* [XMLHttpRequest - Wikipedia] (https://en.wikipedia.org/wiki/XMLHttpRequest)
* [Same Origin Policy - developer.mozilla.org] (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
* [Why is Same Origin Policy so important? - StackExchange] (https://security.stackexchange.com/questions/8264/why-is-the-same-origin-policy-so-important)