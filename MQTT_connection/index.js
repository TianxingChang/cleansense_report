// mqtt server

const mqtt = require('mqtt')
const host = '20.205.45.1'
const port = '18830'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
console.log(clientId)

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
	clientId,
	clean:true,
	connectTimeout: 4000,
	username: 'emqx',
	password: 'public',
	reconnnectPeriod: 1000
})

// subsribe topic 
const topic = '/nodejs/mqtt'
client.on('connect',()=>{
	console.log('Connected')
	client.subscribe([topic],()=>{
		console.log(`Subscribe to topic '${topic}'`)
	})

	client.publish(topic,'nodejs mqtt test', {qos:0, retain:false},(error)=>{
		if(error){
			console.log(error)
		}
	})
})

client.on('message',(topic,payload)=>{
	console.log('Received Message:', topic, payload.toString())
})

