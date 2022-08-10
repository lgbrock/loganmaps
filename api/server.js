const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
// const multer = require('multer');
const cors = require('cors');
const path = require('path');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

dotenv.config();
app.use(express.json());

// Connect to Mongo
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('MongoDB connected!'))
	.catch((err) => console.log(err));

app.use(cors()); //allows for cross origin resource sharing(Not used for this project but very important so make it a habit)

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'images');
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, req.body.name);
// 	},
// });

// const upload = multer({ storage: storage });
// app.post('/api/upload', upload.single('file'), (req, res) => {
// 	try {
// 		return res.status(200).json('File uploaded successfully');
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// Use Routes
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

// Serve static assets if in production
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
// Port
app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running...');
});
