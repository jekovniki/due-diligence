import { server } from "./libs/server";

(async function() {
    try {
        server.start();
    } catch (error) {
        console.error(error);
    }
})();