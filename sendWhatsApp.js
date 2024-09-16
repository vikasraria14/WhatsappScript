const wbm = require('wbm');

const sendMessage = async (contacts, message) => {
    try {
        await wbm.start({ showBrowser: false });
        await wbm.send(contacts, message);
        await wbm.end();
        console.log("Message sent to", contacts);
    } catch (err) {
        console.log("Error:", err.message);
    }
};

module.exports = { sendMessage };
