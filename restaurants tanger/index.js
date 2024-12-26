// Import Express
const express = require('express');

// Initialize the app
const app = express();
const cors = require('cors');
const fs = require('fs');
// Define the server's port
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
let utilisateurs =require("./data.json");

// Get all users
app.get('/restaurants', (req, res) => {
  res.json(utilisateurs); 
});
app.get('/restaurants/:id', (req, res) => {
  const utilisateur = utilisateurs.find(u => u.id === parseInt(req.params.id));
  res.json(utilisateur);
});
// Add a user
app.post('/restaurants', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nom is required' });
  }
  const currentTime = new Date();

  const timeOfDay = parseInt(
    `${currentTime.getFullYear()}${(currentTime.getMonth() + 1).toString().padStart(2, '0')}${currentTime.getDate().toString().padStart(2, '0')}${currentTime.getHours().toString().padStart(2, '0')}${currentTime.getMinutes().toString().padStart(2, '0')}${currentTime.getSeconds().toString().padStart(2, '0')}`
  );

  const nouvelUtilisateur =  {
    id: timeOfDay,
    name: req.body.name,
    address: req.body.address,
    telephone:req.body.telephone,
    email: req.body.email,
    cuisine_type: req.body.cuisine_type,
    image_url: req.body.image_url,
    rating: req.body.rating,
    website: req.body.website
  }
  utilisateurs.push(nouvelUtilisateur);
  save();
  res.status(201).json(nouvelUtilisateur);
});

// Update a user
app.put('/restaurants/:id', (req, res) => {
  const utilisateur = utilisateurs.find(u => u.id === parseInt(req.params.id));
  if (!utilisateur) {
    return res.status(404).send('Utilisateur non trouvé');
  }
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nom is required' });
  }

  utilisateur.name = req.body.name;
  utilisateur.address = req.body.address;
  utilisateur.telephone=req.body.telephone;
  utilisateur.email = req.body.email;
  utilisateur.cuisine_type = req.body.cuisine_type;
  utilisateur.image_url = req.body.image_url;
  utilisateur.rating = req.body.rating;
  utilisateur.website = req.body.website;
  save();
  res.json(utilisateur);
});

// Delete a user
app.delete('/restaurants/:id', (req, res) => {
  const index = utilisateurs.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Utilisateur non trouvé');
  }

  utilisateurs.splice(index, 1);
  save();
  res.sendStatus(204); // No content
});

// Handle other routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function save(){
  fs.writeFile('data.json',  JSON.stringify(utilisateurs, null, 2), (err) => {
    if (err) {
        console.error("Error writing JSON to file:", err);
    } else {
        console.log("JSON file written successfully!");
    }
});
}