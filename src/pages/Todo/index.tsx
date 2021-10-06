import { Button, Fab, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from './index.module.css';
import { addTodo, completeTodo, deleteTodo, getTodo } from '../../services/todo.service';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo() {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            name: data.get('name')
        }
        _addTodo(payload);
    }

    const _addTodo = async (payload: any) => {
        try {
            let { data } = await addTodo(payload);
            setName('');
            _getAllTodo();
        } catch (err) {

        }
    }

    const _getAllTodo = async () => {
        try {
            let { data } = await getTodo();
            setList(data);
        } catch (err) {

        }
    }

    React.useEffect(() => {
        _getAllTodo();
    }, [])

    const onComplete = async (e: any, item: any) => {
        if (e.target.checked) {
            try {
                let { data } = await completeTodo(item.id);
                _getAllTodo();
            } catch (e) {

            }
        }
    }

    const onDelete = async (item: any) => {
        try {
            let { data } = await deleteTodo(item.id);
            _getAllTodo();
        } catch (e) {

        }
    }

    return (
        <React.Fragment>
            <div className="" style={{ position: 'relative', height: '90vh', padding: '20px' }}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Add new "
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                    />
                    <Button type="submit" variant="contained" style={{ marginLeft: '10px' }}>Add</Button>
                </form>
                {/* <div className={styles.addbutton} style={{  }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div> */}
                <ol>
                    {list.map((item: any, index) => {
                        return (
                            <li key={index}>
                                <label>
                                    <input disabled={item.completed_at} type="checkbox" onChange={(e) => onComplete(e, item)} />
                                    <span className={item.completed_at ? styles.done : styles.undone}>{item.name}</span>
                                </label>
                                {!item.completed_at && <DeleteIcon onClick={() => onDelete(item)} style={{ fontSize: 16, cursor: 'pointer' }} />}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </React.Fragment>
    );
}