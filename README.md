# Links 

- [Frontend](https://digital-wallet-dashboard.vercel.app/)
- [Backend Swagger](https://digital-wallet-challenge.herokuapp.com/api). 

# Overview

The main idea is to allow users to create an account and to select ethereum wallets and hook them to their account. The wallet balances
stored in the app DB are updated every 10 seconds by a scheduled job. 
Frontend app is hosted by vercel while backend is hosted by heroku
Development environment for backend is setted with docker compose. 

# Possible improvements

## General

- I decided not to include react app in docker-compose setup because it adds some complexity but it is possible if required

## Frontend
- More complex routing 
- I had a problem with typescript and redux thunk. so i use some ts ignore statements to allow me to go forward, but of course is not the best 
solution
- Some testing. I have not too much experience in testing react apps. Of course I could have done it but surely it would have taken me a long time
- I have build an endpoint to remove user wallets but I do not implement it on frontend because it was not a challenge requirement
- Redux could be use to manage some state besides authentication state. Maybe exchange rates would be a nice option to apply it

## Backend

- The way to update wallet prices is using a scheduled job inside the same server. This is not an scalable approach 
to the problem because when the amount of stored wallets increases this job could be a bottleneck. A better way to approach
this is creating a separate process responsible for that update. 
- When users fetch their wallets I am using eager config in entity relation to fetch both at the same time. This could be 
separated into two operations
- I would have liked to make some e2e tests, but I did not have enough time. Specially production setup has some complexity.
- I only tested services because i think with e2e tests you can test controllers in a better way
- The delete user wallet endpoint only delete selected walle, but I would be nice to delete associated wallet if none other user wallet references it
- I am using the synchronized option in typeorm configuration. This is not the best for production environments because it could cause data inconsistency. I took this approach only for simplicity and it did not generate any problem when deploying the app
