// service/notificationService.ts
import { message } from 'antd';

const notificationService = {
    success: (title, description) => {
        message.success(description || title);
    },

    error: (title, description) => {
        message.error(description || title);
    },

    warning: (title, description) => {
        message.warning(description || title);
    },

    info: (title, description) => {
        message.info(description || title);
    }
};

export default notificationService;