const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const fetch = require('cross-fetch');

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置静态文件夹
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
      const response = await fetch('http://165.227.122.172:3002/get-video-paths');
      const video = await response.json();
  
      res.render('index', { video });
    } catch (error) {
      console.error('Error fetching video paths:', error);
      res.status(500).send('Error fetching video paths');
    }
  });

app.get('/get-latest-videos',async (req, res) => {
    try {
      const response = await fetch('http://165.227.122.172:3002/get-video-paths'); // 替换为3002端口应用上正确的路径
      const video = await response.json();
      res.json(video);
    } catch (error) {
      console.error('Error fetching latest videos:', error);
      res.status(500).send('Error fetching latest videos');
    }
  });



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});