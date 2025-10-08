type Menu = { 
    name: string;
    id: number;
    content: string;
}

export const MenuList: Array<Menu> = [
    {
        name: "Proyectos",
        id: 0,
        content: `# Projects

Here are some of my featured projects:

1. **Portfolio Website**
   - Built with Astro and TypeScript
   - Terminal-style interface
   - Responsive design

2. **Snake Game**
   - Classic snake game implementation
   - Built with vanilla JavaScript
   - Keyboard controls`
    },
    {
        name: "Blog",
        id: 1,
        content: `# Latest Blog Posts

## Getting Started with Astro
Learn how to build blazing-fast websites with Astro...

## TypeScript Best Practices
Essential TypeScript patterns and practices for better code...

## Web Animation Techniques
Create smooth and performant web animations...`
    },
    {
        name: "Snake",
        id: 2,
        content: `# Snake Game

Use arrow keys to control the snake:
↑ - Move Up
↓ - Move Down
← - Move Left
→ - Move Right

Collect food to grow longer!
Avoid hitting the walls or yourself.

Press SPACE to start/pause the game.`
    },
    {
        name: "About Me",
        id: 3,
        content: `# About Me

Hi! I'm a full-stack developer passionate about creating 
engaging web experiences. I specialize in:

- Frontend Development (React, Vue, Astro)
- Backend Development (Node.js, Python)
- UI/UX Design
- Performance Optimization

Feel free to reach out for collaborations!`
    }
]

