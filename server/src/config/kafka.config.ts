import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "chat-app",
  brokers: [process.env.KAFKA_BROKER], // or process.env.KAFKA_BROKER || "localhost:9092"
  logLevel: logLevel.ERROR,
  // no ssl
  // no sasl
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};
