const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置静态文件夹
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    const videosDir = path.join(__dirname, 'public', 'videos'); // 视频文件夹路径
    fs.readdir(videosDir, (err, files) => {
        if (err) return res.status(500).send('Error reading videos directory');
        // 只获取前10个视频文件
        const videos = files.slice(0, 4).map(file => `/public/videos/${file}`);
        res.render('index', { videos });
    });
});

app.get('/get-latest-videos', (req, res) => {
    const videosDir = path.join(__dirname, 'public', 'videos'); // 视频文件夹路径
    fs.readdir(videosDir, (err, files) => {
        if (err) return res.status(500).send('Error reading videos directory');

     
        const videos = files.slice(0, 4).map(file => `/public/videos/${file}`);

        res.json(videos);
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});