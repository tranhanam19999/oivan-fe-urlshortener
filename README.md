# UrlShortenerUi

## Author: Tran Ha Nam

Since this can't be paginated so you can copy the content's name to go to it's section

## Table of contents

### 1. Overview

### 2. Problem

### 3. Solutions

### 4. Final thoughts

##

## 1. Overview

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.
So that we can save time doing other things <br>
You can view Instruc.MD as instruction for setting up this to run at locally

## 2. Problem

Building the UI and stuff is easy, but one weird thing is that I just now that Angular can't load directly env from .env file tho? How come, maybe I was low-tech so I did some researches <br>

Angular will needs to load env throughs a customize .js file which will uses the dotenv to load it and then import that as a package. Or I am wrong haha<br>

Main things to solve is just build 2 panels, one panel for encode and the other for decoding <br>
Then the UI should display the url <br>

The other problem is that if I deploy this source code, I would have to write some kind of proxy that will redirect the request with prefix let's say https://fe.com/r/somecode -> http://ec2ip/r/somecode or https://myserver.com/r/somecode <br>
And the Angular already have the configuration for it so it should really straight forward tho.

## 3. Solutions

So I've built 2 panels, with simple URL validation and then show the results or error if needed <br>
Since I don't have much time left, I planned to use both as in http method since the ec2 is already in http://it's.ip the only thing left is just the UI code to be in http, which is weird right since people always use https, I know I know. And for that to happen, I use the "lt" package (ngrok alternatives) to host my FE code. <br>
I know for a fact that I should have buy 3 domains, one for the shorten url, one for the backend services and the last one for the front-end <br>
So the logic would be that if the user request from the FE, than the FE would make the requests into the backend service, the backend service would then encode the url into a code, attach that code with the shorten url's domain. <br>
Then in the shorten url's domain, we can write proxy configuration, re-routes request into the backend. There it will de-tach the code, and then get the original url -> redirection appear. <br> 

## 4. Final thoughts

Not much since AI did pretty much all the work building the UI, what do you expect from a first-timer Angular kkk <br>
But I got experience a lot with deploying stuff to https through buying domains and tweaks
