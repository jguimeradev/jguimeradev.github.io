class TerminalMenu {
    private options: HTMLLIElement[];
    private contents: HTMLDivElement[];
    private cursor: HTMLSpanElement;
    private currentIndex: number;
    private keydownHandler: (e: KeyboardEvent) => void;

    constructor() {
        this.options = Array.from(document.querySelectorAll<HTMLLIElement>(".menu-option li"));
        this.contents = Array.from(document.querySelectorAll<HTMLDivElement>('.content'));
        this.cursor = document.createElement("span");
        this.cursor.classList.add("cursor");
        this.currentIndex = 0;
        
        // Bind the event handler to maintain proper 'this' context
        this.keydownHandler = this.handleKeydown.bind(this);
        
        this.init();
    }

    private init(): void {
        // Set initial state
        this.updateCursorPosition();
        this.updateContentVisibility();
        
        // Add event listener
        document.addEventListener("keydown", this.keydownHandler);
    }

    private handleKeydown(e: KeyboardEvent): void {
        switch (e.key) {
            case "ArrowDown":
                this.moveDown();
                break;
            case "ArrowUp":
                this.moveUp();
                break;
            case "Enter":
                this.selectCurrentOption();
                break;
        }
    }

    private moveDown(): void {
        this.currentIndex = this.normalizeIndex(this.currentIndex + 1);
        this.updateCursorPosition();
    }

    private moveUp(): void {
        this.currentIndex = this.normalizeIndex(this.currentIndex - 1);
        this.updateCursorPosition();
    }

    private normalizeIndex(index: number): number {
        // Ensure index stays within bounds
        if (index >= this.options.length) return 0;
        if (index < 0) return this.options.length - 1;
        return index;
    }

    private updateCursorPosition(): void {
        // Remove cursor from its current location
        if (this.cursor.parentElement) {
            this.cursor.parentElement.removeChild(this.cursor);
        }
        
        // Add cursor to new location
        this.options[this.currentIndex].insertBefore(this.cursor, this.options[this.currentIndex].firstChild);
    }

    private selectCurrentOption(): void {
        const selectedId = this.options[this.currentIndex].getAttribute("data-id");
        this.updateContentVisibility(selectedId);
    }

    private updateContentVisibility(selectedId: string | null = "0"): void {
        this.contents.forEach(content => {
            const contentId = content.getAttribute('data-id');
            if (contentId === selectedId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    public destroy(): void {
        // Clean up event listeners when needed
        document.removeEventListener("keydown", this.keydownHandler);
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalMenu();
});