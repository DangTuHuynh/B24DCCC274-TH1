import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Popconfirm, message } from 'antd';

interface TodoItem {
  id: number;
  content: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('myTodoList');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!inputValue.trim()) {
      message.warning('Vui lòng nhập nội dung!');
      return;
    }
    const newTodo: TodoItem = {
      id: Date.now(),
      content: inputValue
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(item => (item.id === id ? { ...item, content: editValue } : item)));
    setEditingId(null);
  };

  return (
    <Card title="Bài 2: Quản lý công việc" style={{ maxWidth: 600, margin: '20px auto' }}>
      {/* Thay Space.Compact bằng div để an toàn với mọi phiên bản AntD */}
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Input 
          placeholder="Nhập công việc..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd} style={{ marginLeft: 8 }}> Thêm </Button>
      </div>

      <List
        rowKey="id"
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              editingId === item.id ? (
                <span key="edit-actions">
                  <Button type="link" onClick={() => saveEdit(item.id)}>Lưu</Button>
                  <Button type="link" danger onClick={() => setEditingId(null)}>Hủy</Button>
                </span>
              ) : (
                <span key="normal-actions">
                  <Button type="link" onClick={() => { setEditingId(item.id); setEditValue(item.content); }}>Sửa</Button>
                  <Popconfirm title="Xóa nhé?" onConfirm={() => handleDelete(item.id)}>
                    <Button type="link" danger>Xóa</Button>
                  </Popconfirm>
                </span>
              )
            ]}
          >
            {editingId === item.id ? (
              <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            ) : (
              item.content
            )}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodoList;