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
          "I'm Abhishek's AI Assistant! Abhishek is a Full-Stack Engineer and 3D Web Specialist focused on high-performance web applications, interactive bento interfaces, and scalable architectures.",
      },
      {
        triggers: ['skill', 'stack', 'tech', 'languages', 'framework', 'frontend', 'backend'],
        response:
          'Abhishek specializes in React, Next.js, TypeScript, Node.js, Python, Three.js / WebGL, Docker, and PostgreSQL. Check out the interactive Skills Grid below for detailed proficiency levels!',
      },
      {
        triggers: ['project', 'work', 'built', 'portfolio', 'showcase'],
        response:
          'Featured projects include: 1) Nexus CRM (enterprise real-time dashboard), 2) Spatial 3D Studio (WebGL product visualizer), and 3) OmniPay (cryptographic payment checkout). Scroll down to the Projects section to explore live demos!',
      },
      {
        triggers: ['contact', 'hire', 'email', 'reach', 'call', 'freelance'],
        response:
          'You can contact Abhishek directly via email at abhishek@example.com or book an introductory discovery call using the "Book a Call" button in the top navigation bar!',
      },
      {
        triggers: ['experience', 'education', 'background', 'university', 'hackathon'],
        response:
          'Computer Science background with multiple hackathon podium finishes (Smart City & Space Tech hackathons). Experienced in shipping production-grade SaaS products and immersive consumer web apps.',
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
        triggers: ['hire me', 'hire'],
        response:
          '🎉 Outstanding decision! Abhishek is currently available for select full-time roles and high-impact freelance collaborations. Let’s make it happen!',
      },
      {
        triggers: ['whoami'],
        response:
          'root@portfolio-v2:~# You are an honored guest exploring cutting-edge web design.',
      },
    ];

    // Fallback response
    const defaultResponse =
      "Great question! Abhishek has deep experience across modern web technologies, performance optimization, and creative UI engineering. You can also ask about his 'skills', 'projects', or click any suggestion chip above!";

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
