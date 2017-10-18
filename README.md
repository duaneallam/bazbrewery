# bazbrewery #

A mockup of a basic IoT temperature monitor for a hypothetical beer delivery truck.  The truck transports beer in refrigerated containers that are calibrated to keep the beer in their individual optimal temperature range.  The temperature is monitored by sensors and sent to a display application that informs the driver of the temperature and alerts them if it goes outside of the optimal range.  Communication between the application is handled by an amqp queue such as rabbitmq.

## Requirements ##

A message queue such as rabbitmq.  Easily installed with homebrew or docker.

```brew install rabbitmq```

Or

```docker run -d -p 5672:5672 -p 15672:15672 --hostname rabbit --name rabbit rabbitmq:3```

Node.js.  This has been developed on node v6.11.2.

## Running the Application ##

Clone this repository then update the config as needed.  If your queue is running on an address other than `amqp://localhost` update the `amqp.host` proprty in config.json.  The queue name and the container settings can also be adjusted here.

```git clone https://github.com/duaneallam/bazbrewery.git```

Run `npm install` to install dependencies.

In two seperate terminal windows run `./display.js` and `./sensorConroller.js`.  If that doesn't work you may need to adjust permissions or open the .js files in node (`node display.js` and `node sensorConroller.js` respectively).

Press escape or Ctrl-C to exit the display application.  Press Ctrl-C to exit the sensorController application.

## Development Notes ##

My approach to implementing this challenge was to envisage a real world implementation of the temperature monitoring system as an IoT application and create rapid prototype mockups of the two components that could be switched out for the real thing when they would be developed.  The sensor application could be swapped out for a 3G or 4G enabled microcontroller board with a temperature sensor and the display replaced with a mobile app.  While I think that using TCP/IP to send messages from the one end of a truck to the other is a bit redundant, the internet capabilities could still be useful for back office monitoring.

I have tried to make the application as flexible as possible.  The configuration file allows for an arbitrary number of containers to be monitored, so long as the ids are sequentially numbered.  I would have liked to allow for further confiuration of the container ids but I ran out of time.  Uuids in particular come to mind as i think about the security implications of such an app.

The sensorController app was built with a strict TDD approach.  This was time consuming and difficult in the beginning as most of my effort went to building a robust testing platform for a messaging app.  Once this hurdle was overcome the remaining features were implemented easilt and very quickly.  Due to the configurable nature of the app, multiple copies could run to simulate a scenario where each individual container communicates with the queue directly or a single instance can run simulating a scenario where a single device handles the communication for all containers.

The display app needed to be put together much quicker and uses as simple ncurses based terminal gui.  I had considered creating a web interface for the display but opted for a terminal interface as I felt it more accurately represented the real world application we are trying to simulate.  A web interface in node would most likely require some sort of backend and this I felt strayed a bit too far from the real world scenario and the fact that this challenge is to be implemented in node.js.  Had I had more time I would have implemented some kind of sound notification.

