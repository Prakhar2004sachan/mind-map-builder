# 🧠 Mind Map with React Flow

A fully interactive and customizable **Mind Map** application built using [React Flow](https://reactflow.dev/). Designed for visual thinkers, students, and developers to create, connect, and manage ideas in a structured and intuitive way.

## 🚀 Features

- ✅ Drag-and-drop nodes with smooth interaction
- ✅ Create, delete, and edit mind map nodes
- ✅ Connect nodes with edges
- ✅ Pan & Zoom support
- ✅ Real-time layout updates
- ✅ Custom node components
- ✅ Built with performance and scalability in mind

## 📹 Video Demo

[▶️ Click here to watch the video demo](https://drive.google.com/file/d/1Wgf8ghmGhf4gbjGYajyjjaSBSbZF3b1D/view?usp=sharing)

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [React Flow](https://reactflow.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📦 Installation

Clone the repo and install dependencies:

```
git clone https://github.com/Prakhar2004sachan/mind-map-builder.git
cd react-flow-mindmap
npm install
```

Start the development server:

```
npm run dev  # For Vite
# or
npm start    # For Create React App
```

📁 Folder Structure

```
/src
  ├── components/       # Reusable React components (Nodes, Toolbar, etc.)
  ├── hooks/            # Custom hooks (e.g., useMindMap)
  ├── App.jsx           # Root component
  ├── main.jsx          # Entry point
  └── styles/           # Global styles

```

🧩 How it Works
Nodes are rendered using React Flow's `<ReactFlow />` component.

Edges represent logical or conceptual relationships.

State is managed using React’s `useState`, `useReducer`, or Context API (if implemented).

Users can drag nodes around, create new ones, connect edges, and manage layout visually.

### 🖼️ Screenshots

### 🧠 Node Creation and Connections

![Node Creation](./front-end/src/assets/1.png)

### 🎯 Zoom and Pan

![Zoom and Pan](./front-end/src/assets/2.png)

### 🖱️ Drag and Drop

![Drag and Drop](./front-end/src/assets/3.png)

✨ Demo
(Optional: Add deployed link if hosted on Netlify, Vercel, or GitHub Pages)
🔗 Live Demo: [Click-Here](https://mind-map-builder.vercel.app/)

📌 Future Improvements
💾 Save/load mind maps from localStorage or a backend database

🖼️ Export maps as images or PDFs

⌨️ Keyboard shortcuts for faster workflows

🧑‍🤝‍🧑 Multi-user real-time collaboration

🎨 Theme and color customization per node

🧑‍💻 Author
Prakhar — [@Prakhar2004sachan](https://github.com/Prakhar2004sachan)
Learning full stack development and building cool visual tools!
