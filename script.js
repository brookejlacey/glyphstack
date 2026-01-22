// Terminal-style animations and interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Staggered fade-in animation for content
    const lines = document.querySelectorAll('.line, .response, .ascii-logo');

    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Cursor typing effect for the input line
    const cursor = document.querySelector('.cursor');
    const commands = [
        'Building the future...',
        'Shipping great software...',
        'AI-powered development...',
        'Ready to collaborate?'
    ];
    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeCommand() {
        const currentCommand = commands[commandIndex];
        const inputLine = document.querySelector('.input-line');

        // Find or create the typing text span
        let typingText = inputLine.querySelector('.typing-text');
        if (!typingText) {
            typingText = document.createElement('span');
            typingText.className = 'typing-text';
            typingText.style.color = '#f0f0f0';
            inputLine.insertBefore(typingText, cursor);
        }

        if (isDeleting) {
            typingText.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentCommand.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typingSpeed = 500; // Pause before next command
        }

        setTimeout(typeCommand, typingSpeed);
    }

    // Start typing animation after initial load
    setTimeout(typeCommand, 2000);

    // Add subtle hover glow to terminal
    const terminal = document.querySelector('.terminal');
    terminal.addEventListener('mousemove', (e) => {
        const rect = terminal.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        terminal.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0, 255, 0, 0.03) 0%,
                transparent 50%
            ),
            #1a1a1a
        `;
    });

    terminal.addEventListener('mouseleave', () => {
        terminal.style.background = '#1a1a1a';
    });

    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    // Add rainbow animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Copy email to clipboard
function copyEmail() {
    const email = 'hey@glyphstack.dev';
    navigator.clipboard.writeText(email).then(() => {
        const emailText = document.getElementById('email-text');
        const originalText = emailText.textContent;
        emailText.textContent = 'Copied!';
        setTimeout(() => {
            emailText.textContent = originalText;
        }, 2000);
    });
}

// Console message for fellow developers
console.log('%c⌘ GlyphStack Labs', 'font-size: 24px; font-weight: bold; color: #00ff00;');
console.log('%cAI-native developer studio', 'font-size: 14px; color: #00ffff;');
console.log('%cWant to work together? hey@glyphstack.dev', 'font-size: 12px; color: #ffff00;');
