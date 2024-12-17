<template>
  <div class="container w-full  bg-neutral-800 rounded-lg">
    <h1>ChatGPT Desktop App with Vue</h1>
    <form class="flex-auto p-4  ">
      <div class="">
        <div
          v-for="(entry, index) in chatHistory"
          :key="index"
          class="chat-entry"
        >
          <textarea class=" bg-neutral-700"
            v-model="entry.userMessage"
            placeholder="Type your message here..."
            @input="updateUserMessage(entry, index)"
          ></textarea>
          <button @click="sendQuery(index)">Send</button>
          <p v-if="entry.response" class="response">
            Response: {{ entry.response }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <button
          v-if="chatHistory.length > 0"
          @click="addNewEntry"
          class="add-question text-gray bg-slate-900 text-right"
        >
          Add New Question
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatHistory: [
        {
          userMessage: "",
          response: null,
        },
      ],
    };
  },
methods: {
  async sendQuery(index) {
    const userMessage = this.chatHistory[index].userMessage;
    if (!userMessage) {
      alert("Please type a message first!");
      return;
    }

    try {
      console.log(`Sending message to backend: "${userMessage}"`); // Debug log
      const response = await window.api.sendQuery(userMessage); // Call backend API
      this.chatHistory[index].response = response;

      console.log(`Received response: "${response}"`); // Debug log
    } catch (error) {
      this.chatHistory[index].response = "Error fetching response.";
      console.error("Error:", error);
    }
  },
  addNewEntry() {
    this.chatHistory.push({
      userMessage: "",
      response: null,
    });
  },
  updateUserMessage(entry, index) {
    console.log(`Updated user message at index ${index}:`, entry.userMessage); // Debug log
  }
}

};
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
button {
  margin-bottom: 20px;
}
.chat-entry {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.response {
  background: #f4f4f4;
  padding: 10px;
  margin-top: 10px;
}
.add-question {
  display: block;
  margin: 20px auto;
}
</style>
