"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

type ContactMessage = {
  _id: string;
  fullName: string;
  phoneNumber?: string;
  emailAddress: string;
  message: string;
  createdAt: string;
};

export default function ContactMessagesPage() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-view-password": password },
      });

      if (!res.ok) {
        setError("Wrong password or failed to load.");
        return;
      }

      const data = await res.json();
      setMessages(data);
      setAccessGranted(true);
    } catch (err) {
      setError("Failed to fetch messages.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    fetchMessages();
  };

  if (!accessGranted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md p-6 rounded-lg space-y-4 max-w-md w-full"
        >
          <h1 className="text-xl font-bold text-center text-blue-900">🔐 Enter Access Password</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600"
          >
            View Messages
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">📥 Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white shadow border rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{msg.fullName}</span>
                <span>{format(new Date(msg.createdAt), "dd MMM yyyy HH:mm")}</span>
              </div>
              <p className="text-gray-800 font-medium">{msg.emailAddress}</p>
              {msg.phoneNumber && <p className="text-gray-600">📱 {msg.phoneNumber}</p>}
              <p className="text-gray-700 whitespace-pre-line">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
