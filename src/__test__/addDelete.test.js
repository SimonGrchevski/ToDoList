

test('Adding the new Task', () => {
  document.body.innerHTML =
    '<div>' +
    '  <ul class="tasks"> </ul>'+
    '</div>';
    const des = 'task 1';
    const id = 13;
    const checked = false;
    const tasks = document.querySelector('tasks');
    tasks.append( add(des, id, checked) );

    expect(tasks.).
    
})