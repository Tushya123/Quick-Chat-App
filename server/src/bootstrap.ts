import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

await import("./index.js");
