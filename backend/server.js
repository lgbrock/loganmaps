const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');
const cors = require('cors');

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

app(cors());

// Use Routes
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('../frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
	});
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Backend server is running...');
});
