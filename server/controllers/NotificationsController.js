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
            const userId = req.user

            if (!userId) {
                return res.status(400).json(new StandartRes(1, "User's ID is undefined."));
            }

            const result = await Notification.updateOne(
                { owner: userId },
                { $pull: { notifications: { isChecked: true } } }
            )

            if (result.deletedCount > 0) {
                res.json(new StandartRes(0, 'Checked notifications deleted successfully.', { deletedCount: result.deletedCount }));
            } else {
                console.log(result)
                res.status(404).json(new StandartRes(1, 'No notifications were deleted. Either none exist or criteria did not match.'));
            }
        } catch (e) {
            console.error("Error while deleting notifications:", e);
            res.status(500).json(new StandartRes(1, 'Internal server error.'));
        }
    }
    async deleteNotification(req, res) {
        try {
            const userId = req.user;
            const { notificationId } = req.params

            if (!userId || !notificationId) {
                return res.status(400).json(new StandartRes(1, "User's id or notification id is undefined."));
            }

            const notification = await Notification.findOne({ _id: notificationId, owner: userId });

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

    async checkNotification(req, res) {
        try {
            const { notificationId } = req.params;
            const userId  = req.user;
    
            if (!userId || !notificationId) {
                return res.status(400).json(new StandartRes(1, "User's id or notification id is undefined."));
            }
    
            const notification = await Notification.findOne({ _id: notificationId, owner: userId });
    
            if (!notification) {
                return res.status(404).json(new StandartRes(1, 'Notification not found.'));
            }
    
            notification.isChecked = !notification.isChecked;
            await notification.save();
    
            res.json(new StandartRes(0, 'Notification status updated successfully.', { notification }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }
}

module.exports = new NotificationsController();
