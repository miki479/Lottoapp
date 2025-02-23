const express = require("express");
const app = express();
const path = require("path");

// Configura EJS come motore di template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Imposta il percorso della cartella views

// Serve file statici dalla cartella "public"
app.use(express.static(path.join(__dirname, "public")));

// Funzione per generare il lotto
function getLotto() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const year = now.getFullYear().toString().slice(-2);
    return `L${year}${String(dayOfYear).padStart(3, "0")}`;
}

// Route principale
app.get("/", (req, res) => {
    const lotto = getLotto();
    res.render("index", { lotto }); // Passa il lotto al template EJS
});

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
