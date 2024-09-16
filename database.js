const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    recruiterName: String,
    phoneNumber: String,
    companyName: String,
    jobId: String,
    jobProfile: String,
    sent: { type: Boolean, default: true },
    sentTime: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

mongoose.connect('mongodb://localhost:27017/whatsappMessages', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const saveMessageData = async (recruiterName,  phoneNumber, companyName, jobId, jobProfile) => {
    const messageData = new Message({
        recruiterName,
        phoneNumber,
        companyName,
        jobId,
        jobProfile,
        sent: true
    });
    await messageData.save();
};

const messageAlreadySent = async (phoneNumber) => {
    const message = await Message.findOne({ phoneNumber, sent: true });
    return !!message;
};

module.exports = { saveMessageData, messageAlreadySent };
