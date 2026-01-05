"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  interviewId?: string;
  feedbackId?: string;
  type?: string;
  questions?: string[];
}

export default function Agent({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) {
  const router = useRouter();

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  // ---------------- VAPI EVENTS ----------------
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [
          ...prev,
          { role: message.role, content: message.transcript },
        ]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("error", (e) => console.error("Vapi error:", e));

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
    };
  }, []);

  // ---------------- FEEDBACK ----------------
  useEffect(() => {
    if (messages.length) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const saveFeedback = async () => {
      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED && type !== "generate") {
      saveFeedback();
    }
  }, [callStatus, messages]);

  // ---------------- START CALL (FIXED) ----------------
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const formattedQuestions = questions?.map((q) => `- ${q}`).join("\n") ?? "";

    await vapi.start({
      assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,
      variableValues: {
        username: userName,
        userid: userId,
        questions: formattedQuestions,
      },
    });
  };

  const handleDisconnect = () => {
    vapi.stop();
    setCallStatus(CallStatus.FINISHED);
  };

  // ---------------- UI ----------------
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <Image src="/ai-avatar.png" alt="AI" width={65} height={54} />
          {isSpeaking && <span className="animate-speak" />}
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <Image
            src="/user-avatar.png"
            alt="User"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h3>{userName}</h3>
        </div>
      </div>

      {lastMessage && (
        <div className="transcript-border">
          <p className="animate-fadeIn">{lastMessage}</p>
        </div>
      )}

      <div className="flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="btn-call" onClick={handleCall}>
            Call
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
}
