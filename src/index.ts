"use strict";

// Modules
import app from "./app";

// Settings
const PORT = process.env.PORT || 80;

// Listen
app.listen(PORT, () => {
    const port = PORT === 80 ? ":" : `:${PORT}`;
    console.log(`Server online in localhost${port} at ${new Date()}`);
});