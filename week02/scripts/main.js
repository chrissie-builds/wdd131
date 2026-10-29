const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.getElementById('list');

button.addEventListener('click', function () {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;
    deleteButton.textContent = '❌';

    deleteButton.addEventListener('click', function () {
      li.remove();
      input.focus();
    });

    li.append(deleteButton);
    list.append(li);

    input.value = '';
  }
  input.focus();
});