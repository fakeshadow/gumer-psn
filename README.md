

## Requirement(tested):

    nodejs 10.14.2
    npm 6.4.1


## Setup:
    clone this repo
    npm install
    Rename .env_sample to .env and change whatever params you want
    npm start


## database Setup:
    install mongoDB
    create a databse called "psn" and setup a user password for it.
    change the DATABASE setting in .env file according to your previous setting.

## API endpoints:
*  check https://tusticles.com/psn-php/first_login.html for how to get uuid and 2FA


### **login** 
    [POST]     /api/psn/admin
    accept json body (set your post header 'Content-Type' to 'application/json')
    Required keys and values: 
        'uuId': 'The uuId you get from above tutorial'
        'tfA': 'as above'
        'password': your admin password 


#### **get profile**                    
    [GET]     /api/psn/user_psn_id


### **get trophy by game** 
    [POST]     /api/psn/trophy
    accept json body (set your post header 'Content-Type' to 'application/json')
    Required keys and values:  
        'npCommunicationId': 'NPWRXXXXX_00'
        'onlineId': 'user onlineId'


### **send message** 
    [POST]     /api/psn/message
    accept multipart for image sending (set your post header 'Content-Type' to 'multipart/form-data')
    accept json body for message sending(set your post header 'Content-Type' to 'application/json')
        Required keys and values:  
        text message:
            'onlineId': 'The threadId you want to post message to'
            'message': 'The text content of your message'
        image message:
            form data key:   'onlineId:message'
            form data: png file 

#### **recieve messages**                    
    [GET]     /api/psn/message/:onlineID


#### **leave a message thread**                    
    [DELETE]     /api/psn/message
    accept json body (set your post header 'Content-Type' to 'application/json')
        Accept keys and values:  
            'threadId': 'leave this message thread' 


#### **get user activities**                    
    [GET]   /api/psn/activity/:onlineId        (not working for now)

#### **find games from store**                    
    [GET]    /api/psn/store/:gameName        (not working for now)


### **issue**:
    Refresh token may expire and you have to login again manually.
    Process may halt when auto refreshing token.



### todo:
> docker and scalable multiple instance support.
> basic front end.
> blockchain implement.

> fork form-data to add custom content-length

