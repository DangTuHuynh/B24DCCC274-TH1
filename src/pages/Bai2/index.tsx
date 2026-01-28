import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

// Định nghĩa kiểu dữ liệu cho Todo
interface TodoItem {
  id: number;
  content: string;
}

const TodoList = () => {
  // --- STATE ---
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  
  // State phục vụ việc chỉnh sửa
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // --- EFFECT: Load dữ liệu từ LocalStorage khi mới vào trang ---
  useEffect(() => {
    const savedTodos = localStorage.getItem('myTodoList');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // --- EFFECT: Lưu dữ liệu vào LocalStorage mỗi khi todo thay đổi ---
  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(todos));
  }, [todos]);

  // --- FUNCTION: Thêm mới ---
  const handleAdd = () => {
    if (!inputValue.trim()) {
      message.warning('Vui lòng nhập nội dung!');
      return;
    }
    const newTodo: TodoItem = {
      id: Date.now(), // Dùng timestamp làm ID duy nhất
      content: inputValue
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
    message.success('Đã thêm công việc mới');
  };

  // --- FUNCTION: Xóa ---
  const handleDelete = (id: number) => {
    const newList = todos.filter(item => item.id !== id);
    setTodos(newList);
    message.success('Đã xóa thành công');
  };

  // --- FUNCTION: Bắt đầu sửa ---
  const startEdit = (item: TodoItem) => {
    setEditingId(item.id);
    setEditValue(item.content);
  };

  // --- FUNCTION: Lưu sửa ---
  const saveEdit = (id: number) => {
    const newList = todos.map(item => {
      if (item.id === id) {
        return { ...item, content: editValue };
      }
      return item;
    });
    setTodos(newList);
    setEditingId(null);
    setEditValue('');
    message.success('Đã cập nhật công việc');
  };

  // --- FUNCTION: Hủy sửa ---
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <Card title="Bài 2: Quản lý công việc (TodoList)" style={{ maxWidth: 600, margin: '20px auto' }}>
      {/* Ô nhập liệu thêm mới */}
      <Space.Compact style={{ width: '100%', marginBottom: 20 }}>
        <Input 
          placeholder="Nhập công việc cần làm..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleAdd}
        />
        <Button type="primary" onClick={handleAdd}>Thêm</Button>
      </Space.Compact>

      {/* Danh sách công việc */}
      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              // Nếu đang sửa thì hiện nút Lưu/Hủy, ngược lại hiện Sửa/Xóa
              editingId === item.id ? (
                <>
                  <Button type="link" icon={<SaveOutlined />} onClick={() => saveEdit(item.id)}>Lưu</Button>
                  <Button type="link" danger icon={<CloseOutlined />} onClick={cancelEdit}>Hủy</Button>
                </>
              ) : (
                <>
                  <Button type="link" icon={<EditOutlined />} onClick={() => startEdit(item)}>Sửa</Button>
                  <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => handleDelete(item.id)}>
                    <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
                  </Popconfirm>
                </>
              )
            ]}
          >
            {/* Nội dung hiển thị */}
            {editingId === item.id ? (
              <Input 
                value={editValue} 
                onChange={(e) => setEditValue(e.target.value)} 
                onPressEnter={() => saveEdit(item.id)}
              />
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