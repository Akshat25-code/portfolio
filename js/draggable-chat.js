/**
 * DRAGGABLE-CHAT.JS - Floating & Draggable AI Chatbot Terminal
 * Supports free-form drag positioning, minimize/maximize controls, and offline KB.
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const launcherBtn = document.getElementById('ai-chat-launcher');
    const chatModal = document.getElementById('draggable-chat-modal');
    const dragHandle = document.getElementById('chat-drag-handle');
    const closeBtn = document.getElementById('chat-close-btn');
    const minBtn = document.getElementById('chat-min-btn');

    const chatBody = document.getElementById('chat-body');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chipBtns = document.querySelectorAll('.chip-btn');

    if (!launcherBtn || !chatModal) return;

    let isOpen = false;
    let isMinimized = false;

    // Toggle Chat Window
    function toggleChat(forceOpen = null) {
      isOpen = forceOpen !== null ? forceOpen : !isOpen;
      if (isOpen) {
        chatModal.classList.add('active');
        chatModal.classList.remove('minimized');
        isMinimized = false;
        launcherBtn.classList.add('chat-active');
        setTimeout(() => chatInput?.focus(), 300);
      } else {
        chatModal.classList.remove('active');
        launcherBtn.classList.remove('chat-active');
      }
    }

    launcherBtn.addEventListener('click', () => toggleChat());

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat(false);
      });
    }

    if (minBtn) {
      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMinimized = !isMinimized;
        chatModal.classList.toggle('minimized', isMinimized);
      });
    }

    // ------------------------------------------------------------------------
    // Draggable Window Logic
    // ------------------------------------------------------------------------
    if (dragHandle) {
      let isDragging = false;
      let startX, startY, initialLeft, initialTop;

      dragHandle.addEventListener('mousedown', (e) => {
        if (e.target === closeBtn || e.target === minBtn) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = chatModal.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        chatModal.style.transition = 'none';
        document.body.style.userSelect = 'none';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Clamp to screen bounds
        const maxLeft = window.innerWidth - chatModal.offsetWidth - 10;
        const maxTop = window.innerHeight - chatModal.offsetHeight - 10;

        newLeft = Math.max(10, Math.min(newLeft, maxLeft));
        newTop = Math.max(10, Math.min(newTop, maxTop));

        chatModal.style.left = `${newLeft}px`;
        chatModal.style.top = `${newTop}px`;
        chatModal.style.bottom = 'auto';
        chatModal.style.right = 'auto';
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          chatModal.style.transition = '';
          document.body.style.userSelect = '';
        }
      });
    }

    // ------------------------------------------------------------------------
    // AI Chat Knowledge Base & Typing
    // ------------------------------------------------------------------------
    const knowledgeBase = [
      {
        triggers: ['who are you', 'about', 'bio', 'introduce', 'who made this', 'yourself'],
        response: "I'm Akshat's AI Assistant! Akshat Gupta is an AI Engineer and Full-Stack Developer based in Mumbai, India. He builds intelligent software at the intersection of AI, software engineering, and the web — from agentic RAG systems to production backends."
      },
      {
        triggers: ['skill', 'stack', 'tech', 'languages', 'framework', 'frontend', 'backend'],
        response: "Akshat's core stack includes Python, Java, Spring Boot, FastAPI, LangGraph, FAISS, React, MongoDB, MySQL, and Docker. Explore the 8-orbit celestial solar system below!"
      },
      {
        triggers: ['project', 'work', 'built', 'portfolio', 'showcase'],
        response: "Akshat's featured projects: 1) Adaptive RAG (agentic retrieval & self-correcting RAG pipeline), 2) AI Code Optimizer (multi-model benchmarking sandbox), and 3) AirBnb Backend System (Spring Boot hotel booking engine with pessimistic locking). Check them out on GitHub at https://github.com/Akshat25-code !"
      },
      {
        triggers: ['contact', 'hire', 'email', 'reach', 'call', 'freelance'],
        response: "You can reach Akshat directly at akshatgupta1306@gmail.com, or connect via LinkedIn (linkedin.com/in/akshat-gupta-it/) and GitHub (github.com/Akshat25-code)!"
      },
      {
        triggers: ['experience', 'education', 'background', 'university', 'hackathon', 'degree'],
        response: "Akshat is pursuing a B.Sc in Information Technology at Thakur College of Science & Commerce (Mumbai University, 2023–2026). He holds the Oracle Cloud Infrastructure 2025 AI Foundations Associate certification and is part of the Harvard-founded Aspire Leaders Program."
      },
      {
        triggers: ['hi', 'hello', 'hey', 'sup', 'greetings'],
        response: "Hey there! 👋 Welcome to Akshat's portfolio. Feel free to drag this window anywhere or ask about his AI systems, projects, or background."
      },
      {
        triggers: ['matrix'],
        response: "Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇 (Terminal easter egg activated!)",
        action: 'matrix'
      },
      {
        triggers: ['hire me', 'hire', 'opportunity'],
        response: "🎉 Akshat is open to Software & AI Opportunities! Reach out via email at akshatgupta1306@gmail.com."
      },
      {
        triggers: ['whoami'],
        response: "guest@akshat-portfolio:~# You are an honored guest exploring intelligent software engineering."
      }
    ];

    const defaultResponse = "Great question! Akshat has deep engineering expertise across agentic RAG, full-stack web applications, and scalable backend architecture. Ask about 'projects', 'skills', or 'education'!";

    let isTyping = false;

    function appendMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-message ${sender}`;

      const avatar = document.createElement('div');
      avatar.className = `chat-avatar ${sender}-avatar`;
      avatar.textContent = sender === 'bot' ? 'AI' : 'You';

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.textContent = text;

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
      chatBody.appendChild(msgDiv);
      chatBody.scrollTop = chatBody.scrollHeight;

      return bubble;
    }

    function typeBotResponse(fullText, action = null) {
      isTyping = true;
      const bubble = appendMessage('bot', '');
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      bubble.appendChild(cursor);

      let idx = 0;
      const speed = 16;

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
            chatModal.style.boxShadow = '0 0 40px #00E5FF';
          }
        }
      }

      typeChar();
    }

    function handleQuery(rawQuery) {
      const query = rawQuery.trim().toLowerCase();
      if (!query || isTyping) return;

      appendMessage('user', rawQuery);
      if (chatInput) chatInput.value = '';

      if (query === 'clear' || query === 'cls') {
        chatBody.innerHTML = '';
        appendMessage('bot', 'Chat history cleared. What would you like to know?');
        return;
      }

      let matched = null;
      for (const item of knowledgeBase) {
        if (item.triggers.some((trig) => query.includes(trig))) {
          matched = item;
          break;
        }
      }

      const responseText = matched ? matched.response : defaultResponse;
      const action = matched ? matched.action : null;

      setTimeout(() => {
        typeBotResponse(responseText, action);
      }, 200);
    }

    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (chatInput) handleQuery(chatInput.value);
      });
    }

    chipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query') || btn.textContent.trim();
        handleQuery(query);
      });
    });
  });
})();
