// src/stores/notification.ts
import { defineStore } from 'pinia';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    notifications: [],
    unreadCount: 0,
  }),

  actions: {
    addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      };
      
      this.notifications.unshift(newNotification);
      this.unreadCount++;
    },

    markAsRead(id: string) {
      const notification = this.notifications.find(n => n.id === id);
      if (notification && !notification.read) {
        notification.read = true;
        this.unreadCount--;
      }
    },

    markAllAsRead() {
      this.notifications.forEach(notification => {
        if (!notification.read) {
          notification.read = true;
        }
      });
      this.unreadCount = 0;
    },

    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        const notification = this.notifications[index];
        if (!notification?.read) {
          this.unreadCount--;
        }
        this.notifications.splice(index, 1);
      }
    },

    clearAllNotifications() {
      this.notifications = [];
      this.unreadCount = 0;
    },
  },

  getters: {
    unreadNotifications: (state) => 
      state.notifications.filter(n => !n.read),
  },
});