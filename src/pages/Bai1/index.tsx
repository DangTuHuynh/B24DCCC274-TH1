import React, { useState, useEffect } from 'react';
import { Card, Input, Button, message, Alert, Typography } from 'antd';

const { Title, Text } = Typography;

const GameDoanSo = () => {
  // --- STATE ---
  const [randomNumber, setRandomNumber] = useState<number>(0); // Số ngẫu nhiên hệ thống sinh ra
  const [userGuess, setUserGuess] = useState<string>('');      // Số người chơi nhập
  const [attempts, setAttempts] = useState<number>(10);        // Số lượt còn lại
  const [feedback, setFeedback] = useState<string>('');        // Thông báo kết quả (thấp/cao)
  const [isGameOver, setIsGameOver] = useState<boolean>(false);// Trạng thái kết thúc game

  // --- EFFECT: Chạy 1 lần khi load trang ---
  useEffect(() => {
    startNewGame();
  }, []);

  // --- FUNCTION: Khởi tạo game mới ---
  const startNewGame = () => {
    // Sinh số ngẫu nhiên từ 1 đến 100
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
    setAttempts(10);
    setFeedback('');
    setUserGuess('');
    setIsGameOver(false);
    console.log("Cheat code (Số đúng):", random); // Dùng để test
  };

  // --- FUNCTION: Xử lý đoán số ---
  const handleGuess = () => {
    const guess = parseInt(userGuess);

    // Validate đầu vào
    if (isNaN(guess) || guess < 1 || guess > 100) {
      message.error('Vui lòng nhập một số hợp lệ từ 1 đến 100!');
      return;
    }

    // Logic kiểm tra
    if (guess === randomNumber) {
      setFeedback('Chúc mừng! Bạn đã đoán đúng!');
      setIsGameOver(true);
      message.success('Chiến thắng!');
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts === 0) {
        setFeedback(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
        setIsGameOver(true);
      } else {
        if (guess < randomNumber) {
          setFeedback('Bạn đoán quá thấp!');
        } else {
          setFeedback('Bạn đoán quá cao!');
        }
      }
    }
    // Reset ô nhập sau khi đoán
    setUserGuess(''); 
  };

  return (
    <Card title="Bài 1: Trò chơi đoán số (1 - 100)" style={{ maxWidth: 500, margin: '20px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={4}>Lượt còn lại: <Text type="danger">{attempts}</Text></Title>
      </div>

      {/* Khu vực nhập liệu */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input 
          type="number" 
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Nhập số dự đoán..." 
          disabled={isGameOver}
          onPressEnter={handleGuess}
        />
        <Button type="primary" onClick={handleGuess} disabled={isGameOver}>
          Đoán
        </Button>
      </div>

      {/* Khu vực hiển thị thông báo kết quả */}
      {feedback && (
        <Alert 
          message={feedback} 
          type={feedback.includes('đúng') ? 'success' : (attempts === 0 ? 'error' : 'warning')} 
          showIcon 
          style={{ marginBottom: 20 }}
        />
      )}

      {/* Nút chơi lại */}
      {isGameOver && (
        <Button block onClick={startNewGame}>
          Chơi lại
        </Button>
      )}
    </Card>
  );
};

export default GameDoanSo;