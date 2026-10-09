/**
 * CHAT.JS - Functional Client-Side AI Assistant & Terminal Emulator
 * Features: Structured offline knowledge base, typing animation, prompt chips, and easter eggs.
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.getElementById('chat-body');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chipBtns = document.querySelectorAll('.chip-btn');

    if (!chatBody || !chatForm || !chatInput) return;

    let isTyping = false;

    // Pre-loaded offline Knowledge Base
    const knowledgeBase = [
      {
        triggers: ['who are you', 'about', 'bio', 'introduce', 'who made this', 'yourself'],
        response:
          "I'm Akshat's AI Assistant! Akshat is an AI Engineer and Full-Stack Developer specializing in agentic RAG pipelines, production backends, and modern software systems.",
      },
      {
        triggers: ['skill', 'stack', 'tech', 'languages', 'framework', 'frontend', 'backend'],
        response:
          'Akshat specializes in LangGraph, FastAPI, Spring Boot, React, MongoDB, and AWS. Check out the interactive Skills Grid below for detailed proficiency levels!',
      },
      {
        triggers: ['project', 'work', 'built', 'portfolio', 'showcase'],
        response:
          'Featured projects include: 1) Adaptive RAG (AI agent routing), 2) AI Code Optimizer (Multi-LLM platform), and 3) AirBnb Backend System (Spring Boot). Scroll down to the Projects section to explore live demos!',
      },
      {
        triggers: ['contact', 'hire', 'email', 'reach', 'call', 'freelance'],
        response:
          'You can contact Akshat directly via email by clicking the "Get in Touch" button in the navigation bar to send a message!',
      },
      {
        triggers: ['experience', 'education', 'background', 'university', 'internship', 'sdac'],
        response:
          'Akshat is currently studying IT at Mumbai University. He has practical experience as a Web Developer Intern at SDAC Infotech (working with Apache and Backend systems) and holds an Oracle Cloud Infrastructure AI Foundations certification.',
      },
      {
        triggers: ['hi', 'hello', 'hey', 'sup', 'greetings'],
        response:
          "Hey there! 👋 Welcome to my portfolio. Feel free to ask me anything about my tech stack, past projects, experience, or how to get in touch.",
      },
      {
        triggers: ['matrix'],
        response:
          'Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇 (Terminal easter egg activated!)',
        action: 'matrix',
      },
      {
        triggers: ['hire me', 'hire', 'salary', 'pay', 'money'],
        response:
          '🎉 Outstanding decision! Akshat is open to Software & AI opportunities. Please use the contact form to discuss specifics and compensation!',
      },
      {
        triggers: ['kubernetes', 'k8s', 'trick', 'docker', 'prompt'],
        response:
          "Nice try! While I can't answer every technical question, Akshat's core skills are explicitly listed in the Tech Stack section. For anything else, feel free to reach out to him directly!",
      },
      {
        triggers: ['whoami'],
        response:
          'root@portfolio-v2:~# You are an honored guest exploring cutting-edge web design.',
      },
    ];

    // Fallback response
    const defaultResponse =
      "Great question! Akshat has deep experience across modern web technologies, AI systems, and backend engineering. You can ask about his 'skills', 'projects', or click any suggestion chip above!";

    // Append Message to Chat Log
    function appendMessage(sender, text, isHtml = false) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${sender}`;

      const avatar = document.createElement('div');
      avatar.className = `chat-avatar ${sender}-avatar`;
      avatar.textContent = sender === 'bot' ? 'AI' : 'You';

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';

      if (isHtml) {
        bubble.innerHTML = text;
      } else {
        bubble.textContent = text;
      }

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      return bubble;
    }

    // Typing effect for Bot responses
    function typeBotResponse(fullText, action = null) {
      isTyping = true;
      const bubble = appendMessage('bot', '');
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      bubble.appendChild(cursor);

      let idx = 0;
      const speed = 18; // ms per char

      function typeChar() {
        if (idx < fullText.length) {
          bubble.textContent = fullText.substring(0, idx + 1);
          bubble.appendChild(cursor);
          idx++;
          chatBody.scrollTop = chatBody.scrollHeight;
          setTimeout(typeChar, speed);
        } else {
          cursor.remove();
          isTyping = false;
          if (action === 'matrix') {
            document.querySelector('.terminal-chat-card')?.style.setProperty('box-shadow', '0 0 35px #22c55e');
          }
        }
      }

      typeChar();
    }

    // Process User Query
    function handleQuery(rawQuery) {
      const query = rawQuery.trim().toLowerCase();
      if (!query || isTyping) return;

      // Append user message
      appendMessage('user', rawQuery);
      chatInput.value = '';

      // Check for clear command
      if (query === 'clear' || query === 'cls') {
        chatBody.innerHTML = '';
        appendMessage('bot', 'Chat history cleared. What would you like to know?');
        return;
      }

      // Match Knowledge Base
      let matched = null;
      for (const item of knowledgeBase) {
        if (item.triggers.some((trig) => query.includes(trig))) {
          matched = item;
          break;
        }
      }

      const responseText = matched ? matched.response : defaultResponse;
      const action = matched ? matched.action : null;

      // Slight natural pause before typing
      setTimeout(() => {
        typeBotResponse(responseText, action);
      }, 250);
    }

    // Form submit
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuery(chatInput.value);
    });

    // Chip click handlers
    chipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query') || btn.textContent.trim();
        handleQuery(query);
      });
    });
  });
})();
