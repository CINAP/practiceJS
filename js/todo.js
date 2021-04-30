const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input");
const doList = document.querySelector(".doList");
const fnList = document.querySelector(".finished");

const TODOS_PD = "PENDING";
const TODOS_FN = "FINISHED";
let toDos = [];
let fnDos = [];

//Delete TodoList in doList
const deleteToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  doList.removeChild(li);
  const cleanToDos = toDos.filter((toDo) => {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
};

//Delete FinishedList in fnList
const delFnToDo = (event) => {
  const fnBtn = event.target;
  const fnLi = fnBtn.parentNode;
  fnList.removeChild(fnLi);
  const cleanFnToDos = fnDos.filter((fnDo) => {
    return fnDo.id !== fnLi.id;
  });
  fnDos = cleanFnToDos;
  saveFnToDos();
};

//Check ToDoList in doList
const checkToDo = (event) => {
  if (fnDos.length < 6) {
    const ckBtn = event.target;
    const li = ckBtn.parentNode;
    const fnText = li.firstElementChild.firstChild.data;
    doList.removeChild(li);
    paintFnDo(fnText, li.id);
    const fnToDos = toDos.filter((fnDo) => {
      return fnDo.id === li.id;
    });
    const cleanToDos = toDos.filter((toDo) => {
      return toDo.id !== li.id;
    });
    fnDos.push(...fnToDos);
    saveFnToDos();
    toDos = cleanToDos;
    saveToDos();
  } else {
    alert("처리한일 목록을 비워주세요!");
  }
};

//Undo finishedList from fnList to doList
const undoToDo = (event) => {
  if (toDos.length < 6) {
    const unBtn = event.target;
    const unLi = unBtn.parentNode;
    const undoText = unLi.firstElementChild.firstChild.data;
    fnList.removeChild(unLi);
    paintToDo(undoText, unLi.id);
    const cleanFnToDos = fnDos.filter((fnDo) => {
      return fnDo.id !== unLi.id;
    });
    fnDos = cleanFnToDos;
    saveFnToDos();
  } else {
    alert("해야할일은 6개까지!");
  }
};

//Paint finishedList
const paintFnDo = (value, liId) => {
  const fnDoLi = document.createElement("li");
  const delFBtn = document.createElement("button");
  const undoBtn = document.createElement("button");
  const span = document.createElement("span");
  delFBtn.addEventListener("click", delFnToDo);
  delFBtn.innerText = "❌";
  undoBtn.addEventListener("click", undoToDo);
  undoBtn.innerText = "⏪";
  span.innerText = value;
  fnDoLi.id = liId;
  fnDoLi.appendChild(span);
  fnDoLi.appendChild(delFBtn);
  fnDoLi.appendChild(undoBtn);
  fnList.appendChild(fnDoLi);
};

//Paint todoList
const paintToDo = (value, liId) => {
  const toDoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = String(Date.now());
  let toDoObj;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  checkBtn.innerText = "✅";
  checkBtn.addEventListener("click", checkToDo);
  span.innerText = value;
  toDoLi.appendChild(span);
  toDoLi.appendChild(delBtn);
  toDoLi.appendChild(checkBtn);
  if (liId === undefined) {
    toDoLi.id = newId;
  } else {
    toDoLi.id = liId;
  }
  doList.appendChild(toDoLi);
  if (liId === undefined) {
    toDoObj = {
      text: value,
      id: newId,
    };
  } else {
    toDoObj = {
      text: value,
      id: liId,
    };
  }
  toDos.push(toDoObj);
  saveToDos();
};

const saveFnToDos = () => {
  localStorage.setItem(TODOS_FN, JSON.stringify(fnDos));
};

const saveToDos = () => {
  localStorage.setItem(TODOS_PD, JSON.stringify(toDos));
};

//Load savedata at localStorage
const loadList = () => {
  const pending = localStorage.getItem(TODOS_PD);
  const finished = localStorage.getItem(TODOS_FN);
  if (pending !== null) {
    const parsedPending = JSON.parse(pending);
    parsedPending.forEach((toDo) => {
      paintToDo(toDo.text, toDo.id);
    });
  }
  if (finished !== null) {
    const parsedFinished = JSON.parse(finished);
    parsedFinished.forEach((fnDo) => {
      paintFnDo(fnDo.text, fnDo.id);
    });
    fnDos = parsedFinished;
  }
};

const todoInit = () => {
  loadList();
};

const handleToDoSubmit = (event) => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (toDos.length < 6) {
    if (currentValue.length !== 0) {
      paintToDo(currentValue);
    } else {
      return;
    }
  } else {
    alert("해야할일은 6개 까지!");
  }
  toDoInput.value = "";
};

toDoForm.addEventListener("submit", handleToDoSubmit);

todoInit();
