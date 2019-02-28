### Requirement(tested):
nodejs 10.14.2

npm 6.4.1

### Setup:
1. clone this repo

2. go into the folder and run 

   npm install

3. Rename .env_sample to .env and change whatever params you want

4. npm start

### Addtional Setup:
1. install mongoDB

2. create a databse called "psn" and setup a user password for it.

3. change the DATABASE setting in .env file according to your previous setting.

### API endpoints:

*check https://tusticles.com/psn-php/first_login.html for how to get uuid and 2FA


#### login 
> POST   /api/psn/admin
>
> * accept json body (set your post header 'Content-Type' to 'application/json')
>
> Required keys and values:  
>
> 'uuId': 'The uuId you get from above tutorial'
>
> 'tFA': 'as above'
>
> 'password': your admin password 


#### get profile with trophy summary                    
> GET   /api/psn/user_psn_id


#### get trophy by game
> POST   /api/psn/trophy
>
> * accept json body (set your post header 'Content-Type' to 'application/json')
>
> Required keys and values:  
>
> 'npCommunicationId': 'NPWRXXXXX_00'
>
> 'onlineId': 'user onlineId'
>


#### send message
> POST  /message/send
>
> * accept multipart/form-data (set your post header 'Content-Type' to 'multipart/form-data')
>
> Required keys and values:  
>
> 'threadId': 'The threadId you want to post message to'
>
> 'message': 'The text content of your message'
>
> 'content': 'put your data here. leave it blank if you only send text message'
>
> 'type': '1-4' (1.text; 2.image; 3.audio; 4.sticker?)  
>
> *only type 1 and 2 support for now.(image size is limited to near 20kb png form.)


#### send message direct to onlineId
> POST  /message/send/direct
> 
> * usually it's not optimal to send message directly. As you may form more threads than you need to and make managing and caching harder.
> mostly the same as regular send message. Using local memory cache to decide if a new thread need to be found. It may introduce some errors but will save some api calls.
>
> Required keys and values:  
>
> 'onlineId': 'The onlineId you want to post message to' (id need to be exact match including uper lower caps and symbos)
>
> 'message': 'The text content of your message'
>
> 'content': 'put your data here. leave it blank if you only send text message'
>
> 'type': '1-4' (1.text; 2.image; 3.audio; 4.sticker?)  
>
> *only type 1 and 2 support for now.(image size is limited to near 20kb png form.)



#### recieve messages
>POST   /message/receive
>
> 
>
> Required keys and values:  
>
> 'threadId': 'The threadId you want to get messages from'
>
> 'count': 'The count of messages you want to receive' (limit is set to 100)


#### check message
>GET    /message/new
>
>auto update threads lastmodified date per minute.


#### cross find thread or people
>POST   /message/find
>
> * accept urlencoded body (set your post header 'Content-Type' to 'application/x-www-form-urlencoded')
>
> Accept keys and values(*Doesn't accept both):  
>
> 'threadId': 'find all members' Id in that thread'
>
> 'onlineId': 'find all threads this onlineId is in' (id need to be exact match including uper lower caps and symbos)


#### leave a message thread
>POST   /message/leave
>
> * accept urlencoded body (set your post header 'Content-Type' to 'application/x-www-form-urlencoded')
>
> Accept keys and values:  
>
> 'threadId': 'leave this message thread'


#### get user activities
>POST   /profile/activity        
>
> * accept urlencoded body (set your post header 'Content-Type' to 'application/x-www-form-urlencoded').
>currently have bug and can only retrive the right result on the first try.
>
> Accept keys and values:  
>
> 'onlineId': 'the user you want to check activities'
>
> 'page': 'start with 1'
>
> 'type': 'feed or news'


#### find games from store  - will return a cached value after the first time
>GET    /api/psn/store/gameName
>


### issue:


Refresh token may expire and you have to login again manually.

Process may halt when auto refreshing token.


### todo:
> docker and scalable multiple instance support.
> basic front end.
> blockchain implement.

> fork form-data to add custom content-length


