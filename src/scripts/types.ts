type Menu = { 
    name: string;
    id: number;
    url: string;
}


export const MenuList: Array<Menu> = [
  {
    name: "Proyectos",
    id: 0,
    url: "proyectos",
  },
  {
    name: "Blog",
    id: 1,
    url: "blog",
  },
  {
    name: "Snake",
    id: 2,
    url: "snake",
  },
  {
    name: "About Me",
    id: 3,
    url: "about-me",
  },
];