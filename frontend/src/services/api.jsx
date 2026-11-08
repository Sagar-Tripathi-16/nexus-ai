
const API_URL = "http://localhost:5000/api";

export async function sendMessage(message) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to communicate with NEXUS AI.");
  }

  return data.reply;
}
