// new.js another trial to connect to the broker

const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://20.205.45.1:1884')

client.on('connect',function(){
	console.log('connected the fking broker')

	client.publish('toilet/data', 'Hi there')
	client.subscribe('toilet2/data',function(err){
		if(!err){
			console.log('Subscribed to the topic')
		}
	})

	client.publish('toilet/data','Hi')
})


client.on('message', function(topic,message){
	console.log('Received message:', message.toString())
})



client.subscribe('toilet2/data')

