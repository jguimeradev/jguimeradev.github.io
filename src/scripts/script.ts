document.addEventListener('DOMContentLoaded', () => {
  TerminalMenu();
});

function TerminalMenu() {
    
    const options: NodeListOf<HTMLLIElement> = document.querySelectorAll(".menu-option li");
    const content: NodeListOf<HTMLDivElement> = document.querySelectorAll('.content')
    const cursor: HTMLSpanElement = document.createElement("span");
    cursor.classList.add("cursor");
    
    let currentIndex: number = 0;
    
    // set cursor on the first item
    options[currentIndex].insertBefore(cursor, options[currentIndex].firstChild);
    
    document.addEventListener("keydown", (e: KeyboardEvent): void => {
        if (e.key === "ArrowDown") {
            currentIndex++;
        } else if (e.key === "ArrowUp") {
            currentIndex--;
        } else if (e.key === "Enter") {
            const id: string | null = options[currentIndex].getAttribute("data-id");
            for (const item of content) {
                const itemId = item.getAttribute('data-id')
                if (itemId === id) {
                    item.classList.remove('content')
                    item.classList.add('display')
                } else {
                    item.classList.remove('display')
                    item.classList.add('content')
                }
            }
        }
        
        if (currentIndex === options.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = options.length - 1;
        
        options[currentIndex].insertBefore(cursor, options[currentIndex].firstChild);
    });
    
}