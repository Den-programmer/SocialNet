const Notification = require('../models/notification.js');
const { catchRes, StandartRes } = require('../routes/responses/responses.js');
const { generateUniqueId } = require('../functions/functions.js');

class NotificationsController {
    async getNotifications(req, res) {
        try {
            const userId = req.user;

            if (!userId) {
                res.status(400).json(new StandartRes(1, "User's id is undefined."));
                return;
            }

            const notifications = await Notification.find({ owner: userId });
            res.json(new StandartRes(0, '', { notifications }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }

    async addNotification(req, res) {
        try {
            const userId = req.user;
            const { title, itemType, pageUrl } = req.body;

            if (!userId || !title || !itemType || !pageUrl) {
                res.status(400).json(new StandartRes(1, "Required fields are missing."));
                return;
            }

            const newNotification = new Notification({
                id: generateUniqueId(),
                isChecked: false,
                pageUrl,
                title,
                type: itemType,
                owner: userId
            });

            await newNotification.save();
            res.status(201).json(new StandartRes(0, 'Notification added successfully.', { newNotification }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }

    async deleteNotifications(req, res) {
        try {
            const userId = req.user;
    
            if (!userId) {
                return res.status(400).json(new StandartRes(1, "User's id is undefined."));
            }
    
            const result = await Notification.deleteMany({ owner: userId, isChecked: true });
    
            res.json(new StandartRes(0, 'Checked notifications deleted successfully.', { deletedCount: result.deletedCount }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }

    async deleteNotification(req, res) {
        try {
            const userId  = req.user;
            const { notificationId } = req.params

            console.log('User ID:', userId);
            console.log('Notification ID:', notificationId);

            if (!userId || !notificationId) {
                return res.status(400).json(new StandartRes(1, "User's id or notification id is undefined."));
            }

            const notification = await Notification.findOne({ _id: notificationId, owner: userId });
            console.log('Notification found:', notification);

            if (!notification) {
                return res.status(404).json(new StandartRes(1, 'Notification not found.'));
            }

            await Notification.findOneAndDelete({ _id: notificationId, owner: userId });
            res.json(new StandartRes(0, 'Notification deleted successfully.', { notification }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }
}

module.exports = new NotificationsController();
