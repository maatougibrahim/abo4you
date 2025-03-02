const categories = [
  { name: "Tous", active: true },
  { name: "Vidéo", active: false },
  { name: "Musique", active: false },
  { name: "Cloud", active: false },
]

export default function CategoryNav() {
  return (
    <nav className="container mx-auto overflow-x-auto px-4 py-6 text-center">
      <ul className="flex gap-4 whitespace-nowrap justify-center">
        {categories.map((category) => (
          <li key={category.name}>
            <button
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                category.active ? 'bg-[#00E8DD] text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}


