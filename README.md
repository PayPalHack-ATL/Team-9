# BidPal - A quick way to earn money by auctioning items to your friends

[![BidPal Demo](https://raw.githubusercontent.com/PayPalHack-ATL/Team-9/master/src/frontend/static/img/thumbnail.png)](https://www.youtube.com/watch?v=xYHUSks9TAY)

## Inspiration
Maybe you got a new smartphone, a new laptop, or anything. But you still have your old, functional device, and you don't want to throw it away. So, the best course of action is to sell it to someone!

You probably don't want to deal with shipping and handling. We understand that! You can limit your auction to your close/nearby friends, so you can just hand it off to him/her once it's sold. In addition, you want to see what the best bid is. However, it can get tricky and cumbersome. You will have to individually talk to multiple people, see how much they're willing to offer, and respond back with your offer. It can get annoying very quickly. On top of that, some friends will say things like "C'mon I thought we're friends...You can't do $xx.xx?"

You could be on the other end of the spectrum. Maybe you need a replacement device because your old one finally stopped working. However, there are some problems unsolved by traditional services. The brand new item can cost too much. Maybe you just want a used one since you’re only going to need it temporarily. You may need the device right away within a day or an hour. We aim to solve these issues!

So, we created **BidPal**. A solution that removes all of an unnecessary headache. A solution that brings all of the great features into a single platform.

## What it does
**BidPal** provides a quick way to buy/sell items to/from your friends!
-  *If you are the host:*
List an item to sell just by providing a title, description, image, starting price, and time. They are sold in an auction format, so you can earn the most money by selling it to the highest bidder. Then, share the link to your friends and watch the prices soar!
-  *If you are a bidder:*
If you have a specific link and your friend is selling an item you’re interested, then just hop on and start bidding for that item! At the top, you will see a timer clocking down since the last bid. If you are the highest bidder when the clock ticks down to zero, you won that item!

## How I built it
We created our web application using React.js, Node.js, Socket.io, and MongoDB. The backend runs entirely on Node.js with MongoDB integration. Node.js communicates with the database to store and retrieve users, items, and auction information. Client facing frontend utilizes React.js to build a clean, modern, easy to use user interface. Finally, Socket.io handles the live communication between the front and back-end. It efficiently transreceives real-time auction data between the server and multiple clients.

## Challenges I ran into
Without a doubt, the biggest challenge was time. PayPalHack-ATL is even shorter than an average hackathon. Since it was an overnight hackathon with less than 24 hours to work on the project, we were not able to implement all the features we had in mind. However, with proper time management, we were able to make a scalable MVP.

## Accomplishments that I'm proud of
Despite some issues coming up with an idea at the beginning, we built an MVP. We spent countless hours debating over how to implement the four core themes and how to go about developing an efficient project. We eventually managed to create a service called BidPal.

## What I learned
The first idea can be great, but this does not always mean it’s the final implementation. Halfway through the hackathon, a better project came to life for us. A key lesson learned is staying open to potentially greater ideas.

## What's next for BidPal
Our next step is to actually integrate with Venmo. This will add an easy way of bidding/hosting between friends, family, and other close individuals. We will also implement secondary features: iOS/Android platforms, blind auctions, cryptocurrency bids, and membership capabilities.
