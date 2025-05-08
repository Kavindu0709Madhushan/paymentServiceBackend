import dotenv from 'dotenv';
import { Kafka } from 'kafkajs';

dotenv.config();

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER], // මෙහි env variable එකක් ලෙස access වෙයි
});
let producer;

export const connectKafkaProducer = async () => {
  try {
    producer = kafka.producer();
    await producer.connect();
    console.log('Kafka Producer connected');
  } catch (error) {
    console.error('Kafka Producer connection error:', error);
    throw error;
  }
};

export const sendKafkaMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}:`, message);
  } catch (error) {
    console.error(`Error sending message to topic ${topic}:`, error);
    throw error;
  }
};