// consumer.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const consumeMessages = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'users', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

consumeMessages().catch(console.error);
