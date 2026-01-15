

const savelist = (obj) => {
  const data = JSON.stringify(obj);
  localStorage.setItem("TODOLIST", data);
};

const getlist = () => {
 return JSON.parse(localStorage.getItem("TODOLIST")) || [];
}
const addTask = (task) => {
  const list = getlist();

  list.push({
    id: Date.now(),
    title: task,
    completed: false
  });

  savelist(list);
};
const sendlist = ()=>{
    fetch('/add',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ test: "hello" })
    })
    .then(res => res.json())
  .then(data => {
    console.log("Server response:", data);
  });
}

const renderList = () => {
  const todos = getlist();
  const ul = document.getElementById("todoList");

  ul.innerHTML = ""; // clear old UI

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "bg-gray-50 px-4 py-3 rounded-xl";

    li.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-gray-700">${todo.title}</span>
        </div>

        <div class="flex gap-3 text-sm">
          <a href="#" class="text-blue-600 hover:text-blue-700">Edit</a>
          <button class="text-red-500 hover:text-red-600">✕</button>
        </div>
      </div>
    `;

    ul.appendChild(li);
  });
};
renderList()