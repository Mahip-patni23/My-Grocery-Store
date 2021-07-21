import React, {useState, useEffect} from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }
  else{
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, message: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log(item); */
    if(!name){
      showAlert(true, 'Please Enter value', 'danger')
    }else if(name && isEditing){
      const newList = list.map((item) => {
        if(item.id===editId){
          return {...item, title:name}
        }
        return item;
      })
      setList(newList);
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'Item Edited', 'success')
    }else{
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('')
      showAlert(true, 'Item Added', 'success')
    }
  }
  
  const showAlert = (show= false, message= '', type='') => {
    setAlert({show, message, type});
  } 

  const editItem = (id) => {
    setIsEditing(true);
    setEditId(id);
    const specificItem = list.find((item) => {
      return item.id===id;
    })
    setName(specificItem.title);
  }

  const removeItem = (id) => {
    const newList = list.filter((singleItem) => {
      return singleItem.id!==id;
    })
    setList(newList);
    showAlert(true, 'Item Removed', 'success')
  }

  const clearItems = () => {
    setList([]);
    showAlert(true, 'All Items Cleared', 'success')
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  return <React.Fragment>
    <main>
      <section className="section-center">
        {alert.show && <Alert {...alert} removeAlert={showAlert}></Alert>} 

        <h3>Grocery Store</h3>

        <form className="form-section" onSubmit={handleSubmit}>
          <input type="text" name="item" placeholder="e.g. egg" value={name} onChange={(e) => setName(e.target.value)}/>
          <button className="btn" type="submit">{`${isEditing? 'Edit':'Submit'}`}</button>
        </form>

        <header className="items">
          <List items={list} editItem={editItem} removeItem={removeItem}></List>
        </header>
        {list.length > 0 && (<button className="clearBtn" onClick={clearItems}>clear items</button>)}
      </section>
    </main>
  </React.Fragment>
}

export default App;
