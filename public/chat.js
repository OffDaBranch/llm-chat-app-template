/**
 * LLM Chat App Frontend
 * Phase 7: restore conversation history, show citations, and upload .txt knowledge files.
 */

// DOM elements
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

const uploadFileInput = document.getElementById("upload-file-input");
const uploadButton = document.getElementById("upload-button");
const uploadStatus = document.getElementById("upload-status");
const documentsList = document.getElementById("documents-list");

// Storage key
const CONVERSATION_STORAGE_KEY = "branchops_active_conversation_id";

// Chat state
let conversationId = localStorage.getItem(CONVERSATION_STORAGE_KEY) || null;
let isProcessing = false;
let isUploading = false;

const DEFAULT_GREETING =
	"Hello! I'm your DB-backed Cloudflare AI chat assistant. How can I help you today?";

// Auto-resize textarea as user types
userInput.addEventListener("input", function () {
	this.style.height = "auto";
	this.style.height = this.scrollHeight + "px";
});

// Send message on Enter (without Shift)
userInput.addEventListener("keydown", function (e) {
	if (e.key === "Enter" && !e.shiftKey) {
		e.preventDefault();
		sendMessage();
	}
});

// Button handlers
sendButton.addEventListener("click", sendMessage);
uploadButton.addEventListener("click", uploadKnowledgeFile);

// Initialize app on load
window.addEventListener("load", async () => {
	insertNewChatButton();
	await restoreConversationOnLoad();
	await refreshDocumentList();
});

/**
 * Sends a message to the backend chat API and processes the response.
 */
async function sendMessage() {
	const message = userInput.value.trim();

	if (message === "" || isProcessing) return;

	isProcessing = true;
	userInput.disabled = true;
	sendButton.disabled = true;

	addMessageToChat("user", message);

	userInput.value = "";
	userInput.style.height = "auto";
	typingIndicator.classList.add("visible");

	try {
		const assistantMessageEl = document.createElement("div");
		assistantMessageEl.className = "message assistant-message";

		const paragraph = document.createElement("p");
		assistantMessageEl.appendChild(paragraph);

		chatMessages.appendChild(assistantMessageEl);
		chatMessages.scrollTop = chatMessages.scrollHeight;

		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				conversation_id: conversationId,
				mode: "general",
				message,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to get response");
		}

		const responseConversationId = response.headers.get("x-conversation-id");
		if (responseConversationId) {
			setConversationId(responseConversationId);
		}

		if (!response.body) {
			throw new Error("Response body is null");
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let responseText = "";
		let buffer = "";

		const flushAssistantText = () => {
			paragraph.textContent = responseText;
			chatMessages.scrollTop = chatMessages.scrollHeight;
		};

		let sawDone = false;

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				const parsed = consumeSseEvents(buffer + "\n\n");
				for (const data of parsed.events) {
					if (data === "[DONE]") break;
					const content = extractDeltaText(data);
					if (content) {
						responseText += content;
						flushAssistantText();
					}
				}
				break;
			}

			buffer += decoder.decode(value, { stream: true });
			const parsed = consumeSseEvents(buffer);
			buffer = parsed.buffer;

			for (const data of parsed.events) {
				if (data === "[DONE]") {
					sawDone = true;
					buffer = "";
					break;
				}

				const content = extractDeltaText(data);
				if (content) {
					responseText += content;
					flushAssistantText();
				}
			}

			if (sawDone) {
				break;
			}
		}

		// Reload canonical conversation from server so citations_json is shown
		await refreshConversationFromServer();
	} catch (error) {
		console.error("Error:", error);
		addMessageToChat(
			"assistant",
			"Sorry, there was an error processing your request.",
		);
	} finally {
		typingIndicator.classList.remove("visible");
		isProcessing = false;
		userInput.disabled = false;
		sendButton.disabled = false;
		userInput.focus();
	}
}

/**
 * Upload a .txt file through the browser UI.
 */
async function uploadKnowledgeFile() {
	if (isUploading) return;

	const file = uploadFileInput.files?.[0];

	if (!file) {
		setUploadStatus("Please choose a .txt file first.", "error");
		return;
	}

	if (!file.name.toLowerCase().endsWith(".txt")) {
		setUploadStatus("Only .txt files are supported in this version.", "error");
		return;
	}

	isUploading = true;
	uploadButton.disabled = true;
	setUploadStatus("Uploading file...", "info");

	try {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("/api/documents/upload", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.error || "Upload failed");
		}

		setUploadStatus(
			`Uploaded ${result.document.title} successfully. Chunks created: ${result.document.chunk_count}.`,
			"success",
		);

		uploadFileInput.value = "";
		await refreshDocumentList();
	} catch (error) {
		console.error("Upload error:", error);
		setUploadStatus(
			error.message || "Upload failed. Please try again.",
			"error",
		);
	} finally {
		isUploading = false;
		uploadButton.disabled = false;
	}
}

/**
 * Refresh the uploaded document list in the UI.
 */
async function refreshDocumentList() {
	try {
		const response = await fetch("/api/documents");

		if (!response.ok) {
			throw new Error("Failed to load documents");
		}

		const data = await response.json();
		renderDocumentsList(data.documents || []);
	} catch (error) {
		console.error("Document list error:", error);
		renderDocumentsList([]);
	}
}

/**
 * Render the uploaded document list.
 */
function renderDocumentsList(documents) {
	documentsList.innerHTML = "";

	if (!Array.isArray(documents) || documents.length === 0) {
		const item = document.createElement("li");
		item.textContent = "No documents uploaded yet.";
		documentsList.appendChild(item);
		return;
	}

	for (const doc of documents) {
		const item = document.createElement("li");

		const title = document.createElement("div");
		title.className = "document-title";
		title.textContent = doc.title || "Untitled document";

		const meta = document.createElement("div");
		meta.className = "document-meta";
		meta.textContent = `${doc.source_type || "unknown"}${doc.created_at ? " • " + doc.created_at : ""}`;

		item.appendChild(title);
		item.appendChild(meta);
		documentsList.appendChild(item);
	}
}

/**
 * Show upload status message.
 */
function setUploadStatus(message, variant) {
	uploadStatus.textContent = message;
	uploadStatus.className = `upload-status ${variant}`;
}

/**
 * Restores the saved conversation from D1 on page load.
 */
async function restoreConversationOnLoad() {
	clearChatUi();

	if (!conversationId) {
		showDefaultGreeting();
		return;
	}

	try {
		const restored = await fetchConversationFromServer(conversationId);

		if (!restored) {
			resetConversation();
			return;
		}

		renderConversationMessages(restored.messages);
	} catch (error) {
		console.error("Restore error:", error);
		resetConversation();
	}
}

/**
 * Reload the current conversation from the backend.
 */
async function refreshConversationFromServer() {
	if (!conversationId) return;

	try {
		const restored = await fetchConversationFromServer(conversationId);
		if (!restored) return;

		renderConversationMessages(restored.messages);
	} catch (error) {
		console.error("Refresh error:", error);
	}
}

/**
 * Fetch conversation and messages from backend.
 */
async function fetchConversationFromServer(id) {
	const response = await fetch(
		`/api/conversations/${encodeURIComponent(id)}/messages`,
	);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error("Failed to fetch conversation");
	}

	return response.json();
}

/**
 * Render the whole conversation from server data.
 */
function renderConversationMessages(messages) {
	clearChatUi();

	if (!Array.isArray(messages) || messages.length === 0) {
		showDefaultGreeting();
		return;
	}

	let renderedAny = false;

	for (const msg of messages) {
		if (msg.role !== "user" && msg.role !== "assistant") {
			continue;
		}

		addMessageToChat(msg.role, msg.content, msg.citations_json);
		renderedAny = true;
	}

	if (!renderedAny) {
		showDefaultGreeting();
	}
}

/**
 * Creates a New Chat button next to the send button.
 */
function insertNewChatButton() {
	if (document.getElementById("new-chat-button")) return;

	const newChatButton = document.createElement("button");
	newChatButton.id = "new-chat-button";
	newChatButton.type = "button";
	newChatButton.textContent = "New Chat";

	newChatButton.addEventListener("click", () => {
		resetConversation();
		userInput.focus();
	});

	if (sendButton.parentNode) {
		sendButton.parentNode.insertBefore(newChatButton, sendButton);
	}
}

/**
 * Saves conversation id in memory + localStorage.
 */
function setConversationId(id) {
	conversationId = id;
	localStorage.setItem(CONVERSATION_STORAGE_KEY, id);
}

/**
 * Clears the current conversation state and starts fresh.
 */
function resetConversation() {
	conversationId = null;
	localStorage.removeItem(CONVERSATION_STORAGE_KEY);
	clearChatUi();
	showDefaultGreeting();
}

/**
 * Shows the starter assistant greeting.
 */
function showDefaultGreeting() {
	addMessageToChat("assistant", DEFAULT_GREETING);
}

/**
 * Clears all chat messages from the UI.
 */
function clearChatUi() {
	chatMessages.innerHTML = "";
}

/**
 * Adds a message to the UI.
 */
function addMessageToChat(role, content, citationsJson = null) {
	const messageEl = document.createElement("div");
	messageEl.className = `message ${role}-message`;

	const paragraph = document.createElement("p");
	paragraph.textContent = content;
	messageEl.appendChild(paragraph);

	if (role === "assistant") {
		const citations = parseCitations(citationsJson);
		if (citations.length > 0) {
			const citationBlock = renderCitationBlock(citations);
			messageEl.appendChild(citationBlock);
		}
	}

	chatMessages.appendChild(messageEl);
	chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Parse citations_json safely.
 */
function parseCitations(citationsJson) {
	if (!citationsJson) return [];

	try {
		const parsed = JSON.parse(citationsJson);
		return Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		console.error("Failed to parse citations JSON:", error);
		return [];
	}
}

/**
 * Render citations below assistant messages.
 */
function renderCitationBlock(citations) {
	const wrapper = document.createElement("div");
	wrapper.className = "message-citations";
	wrapper.style.marginTop = "8px";
	wrapper.style.fontSize = "12px";
	wrapper.style.opacity = "0.8";

	const title = document.createElement("div");
	title.textContent = "Sources:";
	title.style.fontWeight = "600";
	title.style.marginBottom = "4px";
	wrapper.appendChild(title);

	const list = document.createElement("ul");
	list.style.margin = "0";
	list.style.paddingLeft = "18px";

	for (const citation of citations) {
		const item = document.createElement("li");
		item.textContent =
			citation.label || `${citation.type || "source"}: ${citation.source_id || ""}`;
		list.appendChild(item);
	}

	wrapper.appendChild(list);
	return wrapper;
}

/**
 * Parses SSE events from the response stream buffer.
 */
function consumeSseEvents(buffer) {
	let normalized = buffer.replace(/\r/g, "");
	const events = [];

	let eventEndIndex;
	while ((eventEndIndex = normalized.indexOf("\n\n")) !== -1) {
		const rawEvent = normalized.slice(0, eventEndIndex);
		normalized = normalized.slice(eventEndIndex + 2);

		const lines = rawEvent.split("\n");
		const dataLines = [];

		for (const line of lines) {
			if (line.startsWith("data:")) {
				dataLines.push(line.slice("data:".length).trimStart());
			}
		}

		if (dataLines.length > 0) {
			events.push(dataLines.join("\n"));
		}
	}

	return { events, buffer: normalized };
}

/**
 * Extracts assistant text from SSE JSON chunks.
 */
function extractDeltaText(data) {
	if (data === "[DONE]") return "";

	try {
		const jsonData = JSON.parse(data);

		if (
			typeof jsonData.response === "string" &&
			jsonData.response.length > 0
		) {
			return jsonData.response;
		}

		if (jsonData.choices?.[0]?.delta?.content) {
			return jsonData.choices[0].delta.content;
		}

		return "";
	} catch (e) {
		console.error("Error parsing SSE data as JSON:", e, data);
		return "";
	}
}