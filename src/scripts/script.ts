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
        
        // Initialize with current pathname or default to proyectos
        const currentPath = window.location.pathname.split('/').pop() || 'proyectos';
        this.currentIndex = this.options.findIndex(option => 
            option.getAttribute('data-url') === currentPath
        );
        if (this.currentIndex === -1) this.currentIndex = 0;
        
        // Bind the handlers
        this.keydownHandler = this.handleKeydown.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        
        this.init();
    }

    private init(): void {
        // Set initial state
        this.updateCursorPosition();
        this.updateContentVisibility();
        this.updateURL();
        
        // Add event listeners
        document.addEventListener("keydown", this.keydownHandler);
        window.addEventListener("hashchange", this.handleHashChange);
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
        const selectedUrl = this.options[this.currentIndex].getAttribute("data-url");
        this.updateContentVisibility(selectedUrl);
        this.updateURL();
    }

    private updateContentVisibility(selectedUrl: string | null = "proyectos"): void {
        this.contents.forEach(content => {
            const contentUrl = content.getAttribute('data-url');
            if (contentUrl === selectedUrl) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    private updateURL(): void {
        const selectedUrl = this.options[this.currentIndex].getAttribute("data-url");
        const url = new URL(window.location.href);
        url.pathname = selectedUrl || "";
        window.history.pushState({}, '', url.toString());
    }

    private handleHashChange(): void {
        const path = window.location.pathname.split('/').pop() || 'proyectos';
        const newIndex = this.options.findIndex(option => 
            option.getAttribute('data-url') === path
        );
        
        if (newIndex !== -1 && newIndex !== this.currentIndex) {
            this.currentIndex = newIndex;
            this.updateCursorPosition();
            this.updateContentVisibility();
        }
    }

    public destroy(): void {
        // Clean up event listeners
        document.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("hashchange", this.handleHashChange);
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalMenu();
});