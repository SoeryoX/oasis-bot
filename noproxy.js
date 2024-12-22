import { readToken, delay } from "./utils/file.js";
import { createConnection } from "./utils/websocket.js";
import { showBanner } from "./utils/banner.js";
import { logger } from "./utils/logger.js";

async function start() {
    showBanner();
    const tokens = await readToken("providers.txt");

    // Batasi jumlah token hingga maksimal 100
    const limitedTokens = tokens.slice(0, 100);

    // Log jika jumlah token melebihi batas
    if (tokens.length > 100) {
        logger("Too many tokens. Only the first 100 will be used.");
    }

    // Create connections tanpa proxy
    for (const token of limitedTokens) {
        await createConnection(token);
        await delay(500);
    }
}

start();
