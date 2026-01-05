import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
  throw new Error("Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY");
}

export const vapi = new Vapi({
  apiKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
});
