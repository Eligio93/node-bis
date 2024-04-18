import { URL } from 'url';
import http from 'http';
import fs from 'fs'
import express from 'express'

const app = express();

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.status(500).send('Errore nel caricamento della pagina');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
});

app.use((req, res) => {
    const pagePath = `.${req.url}.html`;
    fs.readFile(pagePath, (err, data) => {
        if (err) {
            fs.readFile('./404.html', (err, data) => {
                if (err) {
                    res.status(404).send('Pagina non trovata');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
